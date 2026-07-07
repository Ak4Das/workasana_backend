import Team from "../models/Team.js"

export const createTeamService = async (req, res) => {
  try {
    const { name, description, members } = req.body

    const teamExists = await Team.findOne({ name })
    if (teamExists) {
      return res
        .status(400)
        .json({ error: "A team with this name already exists." })
    }

    const newTeam = new Team({ name, description, members: members || [] })
    const savedTeam = await newTeam.save()
    res.status(200)
    res.json({
      success: true,
      message: "Team created successfully",
      respondedData: savedTeam,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const fetchTeamsService = async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 })
    res.status(200)
    res.json({
      success: true,
      message: "Teams fetched successfully",
      respondedData: teams,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const fetchTeamByIdService = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "members",
      "_id name email role",
    )

    if (!team) {
      return res.status(404).json({ error: "Team not found." })
    }

    res.status(200)
    res.json({
      success: true,
      message: "Team fetched successfully",
      respondedData: team,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const updateTeamService = async (req, res) => {
  const { name, description, members } = req.body
  const { teamId } = req.params

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({ error: "Team name cannot be blank." })
  }

  try {
    let team = await Team.findById(teamId)
    if (!team) {
      return res
        .status(404)
        .json({ error: "The requested team profile could not be found." })
    }

    if (name !== undefined) {
      team.name = name.trim()
    }

    if (description !== undefined) {
      team.description = description.trim()
    }

    if (members !== undefined) {
      if (!Array.isArray(members)) {
        return res
          .status(400)
          .json({ error: "Members property must be an array of user IDs." })
      }
      team.members = members
    }

    await team.save()

    const updatedTeam = await Team.findById(teamId).populate(
      "members",
      "name email",
    )

    res.status(200)
    res.json({
      success: true,
      message: "Team updated successfully",
      respondedData: updatedTeam,
    })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid reference ID formatting provided in arguments.",
      })
    }

    res.status(500).json({
      error:
        "Internal server error processing team modifications: " + error.message,
    })
  }
}

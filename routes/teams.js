const express = require("express")
const router = express.Router()
const Team = require("../models/Team")
const auth = require("../middleware/auth")

router.post("/", auth, async (req, res) => {
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
})

router.get("/", auth, async (req, res) => {
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
})

router.get("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "members",
      "_id name email role",
    )

    if (!team) return res.status(404).json({ error: "Team not found." })

    res.status(200)
    res.json({
      success: true,
      message: "Team fetched successfully",
      respondedData: team,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router

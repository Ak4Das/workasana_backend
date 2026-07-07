import Project from "../models/Project.js"

export const createProjectService = async (req, res) => {
  try {
    const { name, description, status } = req.body

    const projectExists = await Project.findOne({ name })
    if (projectExists) {
      return res
        .status(400)
        .json({ error: "A project with this title is already active." })
    }

    const newProject = new Project({ name, description, status })
    const savedProject = await newProject.save()
    res.status(200)
    res.json({
      success: true,
      message: "Project created successfully",
      respondedData: savedProject,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const fetchProjectsService = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.status(200)
    res.json({
      success: true,
      message: "Projects fetched successfully",
      respondedData: projects,
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
}
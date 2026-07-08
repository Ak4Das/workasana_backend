import Task from "../models/Task.js"

export const fetchTaskService = async (req, res) => {
  try {
    const { team, owner, tags, project, status, priority, priorityOrder } =
      req.query
    let properties = {}

    if (team) {
      properties.team = team
    }

    if (project) {
      properties.project = project
    }

    if (status) {
      properties.status = status
    }

    if (owner) {
      properties.owners = owner
    }

    if (priority) {
      properties.priority = priority
    }

    if (tags) {
      properties.tags = Array.isArray(tags) ? { $all: tags } : tags
    }

    const sortOptions = {}

    if (priorityOrder === "highToLow") {
      sortOptions.priority = 1
    } else if (priorityOrder === "lowToHigh") {
      sortOptions.priority = -1
    }

    const tasks = await Task.find(properties)
      .populate("project", "name description")
      .populate("team", "name")
      .populate("owners", "name email")
      .populate("tags", "name")
      .sort(sortOptions)

    res.status(200)
    res.json({
      success: true,
      message: "Tasks fetched successfully",
      respondedData: tasks,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const fetchTaskByIdService = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name description")
      .populate("team", "name")
      .populate("owners", "name email")
      .populate("tags", "name")

    if (!task) {
      return res.status(404).json({ error: "Task not found." })
    }

    res.status(200)
    res.json({
      success: true,
      message: "Task fetched successfully",
      respondedData: task,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const createTaskService = async (req, res) => {
  try {
    const {
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
      priority,
    } = req.body
    const newTask = new Task({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
      priority,
    })
    const savedTask = await newTask.save()
    res.status(200)
    res.json({
      success: true,
      message: "Task created successfully",
      respondedData: savedTask,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateTaskService = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("project team owners tags")
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." })
    }

    res.status(200)
    res.json({
      success: true,
      message: "Task updated successfully",
      respondedData: updatedTask,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const deleteTaskService = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findById(taskId)

    if (!task) {
      return res
        .status(404)
        .json({ error: "Target task assignment not found." })
    }

    await Task.findByIdAndDelete(taskId)

    res.json({
      success: true,
      message: "Task successfully removed from workspace records.",
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

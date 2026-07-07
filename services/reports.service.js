import Task from "../models/Task.js"
import Team from "../models/Team.js"
import User from "../models/User.js"

function findRemainingDays(createdAt, allocatedTime) {
  const createdAtDay = new Date(createdAt)
  const today = new Date()
  const passedDay = (today - createdAtDay) / (1000 * 60 * 60 * 24)
  const remainingDays = allocatedTime - Math.floor(passedDay)
  return remainingDays
}

export const pendingTaskReportService = async (req, res) => {
  try {
    const activeTasks = await Task.find({
      status: { $ne: "Completed" },
    }).populate("project", "name")

    const projectPendingEffortDays = {}

    activeTasks.forEach((task) => {
      const projName = task.project.name
      const remainingDays = findRemainingDays(
        task.createdAt,
        task.timeToComplete,
      )

      projectPendingEffortDays[projName] =
        (projectPendingEffortDays[projName] || 0) + remainingDays
    })

    res.json({
      success: true,
      message: "Successful",
      respondedData: projectPendingEffortDays,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const closedTaskTeamReportService = async (req, res) => {
  try {
    const completedTasks = await Task.find({ status: "Completed" })

    const teamCountsMap = {}
    completedTasks.forEach((task) => {
      if (task.team) {
        const teamIdStr = task.team.toString()
        teamCountsMap[teamIdStr] = (teamCountsMap[teamIdStr] || 0) + 1
      }
    })

    const allTeams = await Team.find()

    const distributions = allTeams
      .map((team) => {
        const teamIdStr = team._id.toString()
        return {
          _id: team._id,
          count: teamCountsMap[teamIdStr] || 0,
          teamDetails: {
            name: team.name,
          },
        }
      })
      .filter((item) => item.count > 0)

    res.status(200)
    res.json({
      success: true,
      message: "Successful",
      respondedData: distributions,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const closedTaskOwnersReportsService = async (req, res) => {
  try {
    const completedTasks = await Task.find({ status: "Completed" })

    const ownerCountsMap = {}
    completedTasks.forEach((task) => {
      task.owners.forEach((owner) => {
        ownerCountsMap[owner] = (ownerCountsMap[owner] || 0) + 1
      })
    })

    const users = await User.find()

    const closedTasksCountByOwners = users
      .map((user) => {
        return {
          _id: user._id,
          name: user.name,
          count: ownerCountsMap[user._id] || 0,
        }
      })
      .filter((user) => user.count > 0)

    res.status(200)
    res.json({
      success: true,
      message: "Successful",
      respondedData: closedTasksCountByOwners,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const lastWeekCompletedTaskReportService = async (req, res) => {
  try {
    const date = new Date()
    date.setDate(date.getDate() - 7)

    const tasks = await Task.find({
      status: "Completed",
      updatedAt: { $gte: date },
    })

    const weekArray = [0, 0, 0, 0, 0, 0, 0]

    tasks.forEach((task) => {
      if (task.updatedAt) {
        const calendarIndex = new Date(task.updatedAt).getDay()

        const Index = calendarIndex === 0 ? 6 : calendarIndex - 1

        if (Index >= 0 && Index < 7) {
          weekArray[Index] += 1
        }
      }
    })

    res.json({
      success: true,
      message: "Successful",
      respondedData: weekArray,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

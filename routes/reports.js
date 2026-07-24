import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  pendingTaskReportController,
  closedTaskTeamReportController,
  closedTaskOwnersReportsController,
  lastWeekCompletedTaskReportController,
} from "../controllers/reports.controller.js"

router.get("/pending", auth, pendingTaskReportController)

router.get("/closed-tasks-teams", auth, closedTaskTeamReportController)

router.get("/closed-tasks-owners", auth, closedTaskOwnersReportsController)

router.get("/last-week", auth, lastWeekCompletedTaskReportController)

export default router

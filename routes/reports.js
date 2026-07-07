import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  pendingTaskReportService,
  closedTaskTeamReportService,
  closedTaskOwnersReportsService,
  lastWeekCompletedTaskReportService,
} from "../services/reports.service.js"

router.get("/pending", auth, pendingTaskReportService)

router.get("/closed-tasks-teams", auth, closedTaskTeamReportService)

router.get("/closed-tasks-owners", auth, closedTaskOwnersReportsService)

router.get("/last-week", auth, lastWeekCompletedTaskReportService)

export default router

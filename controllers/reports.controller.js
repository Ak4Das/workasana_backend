import {
  closedTaskOwnersReportsService,
  closedTaskTeamReportService,
  lastWeekCompletedTaskReportService,
  pendingTaskReportService,
} from "../services/reports.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const pendingTaskReportController = asyncHandler(
  pendingTaskReportService,
)

export const closedTaskTeamReportController = asyncHandler(
  closedTaskTeamReportService,
)

export const closedTaskOwnersReportsController = asyncHandler(
  closedTaskOwnersReportsService,
)

export const lastWeekCompletedTaskReportController = asyncHandler(
  lastWeekCompletedTaskReportService,
)

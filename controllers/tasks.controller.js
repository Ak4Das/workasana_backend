import {
  createTaskService,
  deleteTaskService,
  fetchTaskByIdService,
  fetchTaskService,
  updateTaskService,
} from "../services/tasks.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const fetchTaskController = asyncHandler(fetchTaskService)

export const fetchTaskByIdController = asyncHandler(fetchTaskByIdService)

export const createTaskController = asyncHandler(createTaskService)

export const updateTaskController = asyncHandler(updateTaskService)

export const deleteTaskController = asyncHandler(deleteTaskService)

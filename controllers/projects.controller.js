import {
  createProjectService,
  fetchProjectsService,
} from "../services/project.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const createProjectController = asyncHandler(createProjectService)

export const fetchProjectsController = asyncHandler(fetchProjectsService)

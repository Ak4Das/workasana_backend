import {
  createTeamService,
  fetchTeamByIdService,
  fetchTeamsService,
  updateTeamService,
} from "../services/teams.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const createTeamController = asyncHandler(createTeamService)

export const fetchTeamsController = asyncHandler(fetchTeamsService)

export const fetchTeamByIdController = asyncHandler(fetchTeamByIdService)

export const updateTeamController = asyncHandler(updateTeamService)

import {
  fetchUsersService,
  updateProfileService,
} from "../services/users.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const fetchUsersController = asyncHandler(fetchUsersService)

export const updateProfileController = asyncHandler(updateProfileService)

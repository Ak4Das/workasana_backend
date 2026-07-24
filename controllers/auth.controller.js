import {
  fetchMeService,
  loginService,
  signupService,
} from "../services/auth.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const signupController = asyncHandler(signupService)

export const loginController = asyncHandler(loginService)

export const fetchMeController = asyncHandler(fetchMeService)

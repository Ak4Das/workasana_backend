import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  fetchUsersService,
  updateProfileService,
} from "../services/users.service.js"

router.get("/", auth, fetchUsersService)

router.patch("/profile", auth, updateProfileService)

export default router

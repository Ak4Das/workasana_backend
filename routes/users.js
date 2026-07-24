import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  fetchUsersController,
  updateProfileController,
} from "../controllers/users.controller.js"

router.get("/", auth, fetchUsersController)

router.patch("/profile", auth, updateProfileController)

export default router

import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  fetchUsersController,
  updateProfileController,
} from "../controllers/users.controller.js"
import { SchemaValidation } from "../middleware/SchemaValidation.middleware.js"
import { editProfileSchema } from "../schemas/EditProfile.schema.js"

router.get("/", auth, fetchUsersController)

router.patch(
  "/profile",
  auth,
  SchemaValidation(editProfileSchema),
  updateProfileController,
)

export default router

import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"

import {
  signupController,
  loginController,
  fetchMeController,
} from "../controllers/auth.controller.js"
import { SchemaValidation } from "../middleware/schemaValidation.middleware.js"
import { userSchema } from "../schemas/User.schema.js"
import { loginSchema } from "../schemas/Login.schema.js"

router.post("/signup", SchemaValidation(userSchema), signupController)

router.post("/login", SchemaValidation(loginSchema), loginController)

router.get("/me", auth, fetchMeController)

export default router

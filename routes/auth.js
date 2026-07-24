import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"

import {
  signupController,
  loginController,
  fetchMeController,
} from "../controllers/auth.controller.js"

router.post("/signup", signupController)

router.post("/login", loginController)

router.get("/me", auth, fetchMeController)

export default router

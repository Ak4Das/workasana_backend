import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  signupService,
  loginService,
  fetchMeService,
} from "../services/auth.service.js"

router.post("/signup", signupService)

router.post("/login", loginService)

router.get("/me", auth, fetchMeService)

export default router

import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  createProjectService,
  fetchProjectsService,
} from "../services/project.service.js"

router.post("/", auth, createProjectService)

router.get("/", auth, fetchProjectsService)

export default router

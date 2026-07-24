import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"

import {
  createProjectController,
  fetchProjectsController,
} from "../controllers/projects.controller.js"

router.post("/", auth, createProjectController)

router.get("/", fetchProjectsController)

export default router

import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"

import {
  createProjectController,
  fetchProjectsController,
} from "../controllers/projects.controller.js"
import { SchemaValidation } from "../middleware/SchemaValidation.middleware.js"
import { projectSchema } from "../schemas/Project.schema.js"

router.post("/", auth, SchemaValidation(projectSchema), createProjectController)

router.get("/", fetchProjectsController)

export default router

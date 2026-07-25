import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  createTeamController,
  fetchTeamsController,
  fetchTeamByIdController,
  updateTeamController,
} from "../controllers/teams.controller.js"
import { SchemaValidation } from "../middleware/SchemaValidation.middleware.js"
import { editTeamSchema } from "../schemas/EditTeam.schema.js"

router.post("/", auth, SchemaValidation(editTeamSchema), createTeamController)

router.get("/", auth, fetchTeamsController)

router.get("/:id", auth, fetchTeamByIdController)

router.patch("/:teamId", auth, updateTeamController)

export default router

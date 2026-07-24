import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  createTeamController,
  fetchTeamsController,
  fetchTeamByIdController,
  updateTeamController,
} from "../controllers/teams.controller.js"

router.post("/", auth, createTeamController)

router.get("/", auth, fetchTeamsController)

router.get("/:id", auth, fetchTeamByIdController)

router.patch("/:teamId", auth, updateTeamController)

export default router

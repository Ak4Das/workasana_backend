import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  createTeamService,
  fetchTeamsService,
  fetchTeamByIdService,
  updateTeamService,
} from "../services/teams.service.js"

router.post("/", auth, createTeamService)

router.get("/", auth, fetchTeamsService)

router.get("/:id", auth, fetchTeamByIdService)

router.patch("/:teamId", auth, updateTeamService)

export default router

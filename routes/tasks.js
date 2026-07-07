import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  fetchTaskService,
  fetchTaskByIdService,
  createTaskService,
  updateTaskService,
} from "../services/tasks.service.js"

router.get("/", auth, fetchTaskService)

router.get("/:id", auth, fetchTaskByIdService)

router.post("/", auth, createTaskService)

router.patch("/:id", auth, updateTaskService)

export default router

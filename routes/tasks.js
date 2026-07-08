import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  fetchTaskService,
  fetchTaskByIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/tasks.service.js"

router.get("/", fetchTaskService)

router.get("/:id", auth, fetchTaskByIdService)

router.post("/", auth, createTaskService)

router.patch("/:id", auth, updateTaskService)

router.delete("/:id", auth, deleteTaskService)

export default router

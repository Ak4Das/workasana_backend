import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  fetchTaskController,
  fetchTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js"

router.get("/", fetchTaskController)

router.get("/:id", auth, fetchTaskByIdController)

router.post("/", auth, createTaskController)

router.patch("/:id", auth, updateTaskController)

router.delete("/:id", auth, deleteTaskController)

export default router

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
import { SchemaValidation } from "../middleware/schemaValidation.middleware.js"
import { taskSchema } from "../schemas/EditTask.schema.js"

router.get("/", fetchTaskController)

router.get("/:id", auth, fetchTaskByIdController)

router.post("/", auth, SchemaValidation(taskSchema), createTaskController)

router.patch("/:id", auth, updateTaskController)

router.delete("/:id", auth, deleteTaskController)

export default router

import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import {
  createTagController,
  fetchTagsController,
} from "../controllers/tags.controller.js"

router.post("/", auth, createTagController)

router.get("/", auth, fetchTagsController)

export default router

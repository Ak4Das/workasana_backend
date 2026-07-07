import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"
import { createTagService, fetchTagsService } from "../services/tags.service.js"

router.post("/", auth, createTagService)

router.get("/", auth, fetchTagsService)

export default router

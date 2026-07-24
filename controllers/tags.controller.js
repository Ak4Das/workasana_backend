import { createTagService, fetchTagsService } from "../services/tags.service.js";
import { asyncHandler } from "../utils/asyncHandler.js"

export const createTagController = asyncHandler(createTagService)

export const fetchTagsController = asyncHandler(fetchTagsService)

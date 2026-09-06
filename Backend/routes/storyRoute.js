import express from "express";

import {
  createStory,
  getPublishedStories,
  getPublishedStoryBySlug,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
  publishStory,
  unpublishStory,
} from "../controllers/storyController.js";

import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();



router.get("/", getPublishedStories);


router.get("/slug/:slug", getPublishedStoryBySlug);


router.get("/admin/all", verifyAdmin, getAllStories);


router.get("/admin/:id", verifyAdmin, getStoryById);


router.post("/", verifyAdmin, createStory);


router.put("/:id", verifyAdmin, updateStory);


router.delete("/:id", verifyAdmin, deleteStory);


router.patch("/:id/publish", verifyAdmin, publishStory);

router.patch("/:id/unpublish", verifyAdmin, unpublishStory);


export default router;
import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getMessages, sendMessages, sideBarUsers } from '../controller/messageController.js';

const router = express.Router()

router.get("/users",protectRoute,sideBarUsers)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessages)

export default router
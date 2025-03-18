import express from "express";
import { signup,login,logout, updateProfile, checkAuth } from "../controller/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(express.json());


router.post("/signup",signup)

router.get("/login",login)

router.get("/logout",logout)

router.put("/update-profile",protectRoute,updateProfile)

router.get("/check",protectRoute,checkAuth)

export default router;
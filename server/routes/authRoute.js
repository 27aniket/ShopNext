import express, { Router } from "express";
import {registerUser, loginUser, getUsers} from "../controllers/authController";
import {protect} from "../middleware/authMiddleware";
import {admin} from "../middleware/adminMiddleware"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);

export default router;
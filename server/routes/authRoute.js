import express, { Router } from "express";
import {registerUser, loginUser, getUsers} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers)

export default router;
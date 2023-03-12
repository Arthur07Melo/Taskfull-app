import express from "express";
import { createUser, loginUser } from "../controllers/usersControllers";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", createUser);

export default router
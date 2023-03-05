import express from "express";
const router = express.Router();
import { toggleHabit, getDay, getSummary } from "../controllers/daysControllers";

router.get("/", getDay);
router.patch("/:habitID/toggle", toggleHabit);
router.get("/summary", getSummary);


export default router;
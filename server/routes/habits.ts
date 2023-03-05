import express from "express";
import { addHabit, deleteHabit, getAllHabits, getSpecificHabit } from "../controllers/habitsControllers";

const router = express.Router();


router.get("/", getAllHabits);
router.get("/:habitID", getSpecificHabit);
router.post("/", addHabit);
router.delete("/:habitID", deleteHabit);


export default router;
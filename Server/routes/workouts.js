import { Router } from "express";
import {
    createWorkout,
    deleteWorkout,
    getAllWorkouts,
    getWorkoutById,
    updateWorkout,
} from "../controllers/workout.js";
export const workoutsRouter = Router();

workoutsRouter.get("/", getAllWorkouts);
workoutsRouter.post("/", createWorkout);
workoutsRouter.get("/:id", getWorkoutById);
workoutsRouter.patch("/:id", updateWorkout);
workoutsRouter.delete("/:id", deleteWorkout);

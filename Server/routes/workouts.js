import { Router } from "express";
import {
    createWorkout,
    deleteWorkout,
    getAllWorkouts,
    getWorkoutById,
    updateWorkout,
} from "../controllers/workout.js";
import requireAuth from "../middleware/requireAuth.js";

export const workoutsRouter = Router();

//require auth for all workout routes
workoutsRouter.use(requireAuth);

workoutsRouter.get("/", getAllWorkouts);
workoutsRouter.post("/", createWorkout);
workoutsRouter.get("/:id", getWorkoutById);
workoutsRouter.patch("/:id", updateWorkout);
workoutsRouter.delete("/:id", deleteWorkout);

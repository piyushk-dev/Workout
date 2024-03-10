import { Router } from "express";
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from "../controllers/workoutController.js";

export const workoutRoutes = Router();


workoutRoutes.get("/",getWorkouts);

workoutRoutes.get("/:id",getWorkout);

workoutRoutes.post("/",createWorkout);

workoutRoutes.delete("/:id",deleteWorkout);

workoutRoutes.patch("/:id",updateWorkout);

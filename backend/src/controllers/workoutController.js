import mongoose from "mongoose";
import { Workout } from "../models/workout.model.js";

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workouts = await Workout.create({ title, reps, load });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const response = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" }); // why return?
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) return res.status(404).json({ error: "No such workout" });
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) return res.status(404).json({ error: "No such workout" });
  res.status(200).json(workout);
};
export { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout };

import { useContext } from "react";
import { workoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(workoutContext);
  if (!context) {
    throw new Error(
      "useWorkoutContext must be used inside an WorkoutsContextProvider"
    );
  }
  return context;
};

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const workoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      }
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      }
      case "DELETE_WORKOUT":
        return{
          workouts:state.workouts.filter((e)=>e._id!=action.payload._id)
        }
      default:
        return state
  }
};
export const WorkoutContextProvider = (props) => {
  //or destuc children on fly

  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <workoutContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </workoutContext.Provider>
  );
};

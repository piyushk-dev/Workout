/* eslint-disable react/prop-types */

import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { title, reps, load, createdAt } = workout;
  const {dispatch}=useWorkoutContext();
  const handledelete = async () => {
    try{const response = await fetch("http://localhost:3300/api/workouts/"+workout._id, {
      method: "DELETE",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json= await response.json();
    if (response.ok) {
      dispatch({type:"DELETE_WORKOUT",payload:json});
    }
    else{
      alert("Error deleting workout")
    }}
    catch(error){
      console.log(error.message);
    }
  };
  // console.log("rendered-details")
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>Reps : </strong>
        {reps}
      </p>
      <p>{createdAt}</p>
      <span onClick={handledelete}>
        <img src={"/assets/delete.png"} width={25} height={20}/>
      </span>
    </div>
  );
};

export default WorkoutDetails;

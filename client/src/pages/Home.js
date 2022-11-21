import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext"

// components
//import WorkoutDetails from "../components/WorkoutDetails"
//import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext()
  const { user } = useAuthContext()
 
  const API_URL = 'http://localhost:4000';


  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API_URL}/api/workouts`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        // keep local state in sync with db
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
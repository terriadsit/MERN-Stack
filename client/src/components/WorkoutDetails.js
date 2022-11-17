import { useWorkoutContext } from "../hooks/useWorkoutsContext"

export default function WorkoutDetails ({ workout }) {
  const { dispatch } = useWorkoutContext()
  
  const API_URL = 'http://localhost:4000'

  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
      console.log('workout deleted', json)
    }
  }

  return (
    <div className='workout-details'>
      <h4>
        {workout.title}
        
      </h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleDelete}>X</span>
    </div>
  )
}

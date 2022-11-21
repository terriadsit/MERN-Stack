import { useWorkoutContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



export default function WorkoutDetails ({ workout }) {
  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
  
  const API_URL = 'http://localhost:4000'

  const handleDelete = async () => {
    if (!user) {
      return
    }
    const response = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
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
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  )
}

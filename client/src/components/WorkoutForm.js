import { useState } from 'react'

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState(0)
    const [reps, setReps] = useState(0)
    const [error, setError] = useState('')

    const API_URL = 'http://localhost:4000';

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, load, reps}
        
        const response = await fetch(`${API_URL}/api/workouts`, {
              method: 'post',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(workout), //body must be a string
            })
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
        }   
        if (response.ok) {
            console.log('workout added', json)
            setError('')
            setTitle('')
            setReps(0)
            setLoad(0)
        }     
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise title:</label>
            <input
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label>Exercise load (kg):</label>
            <input
              type='number'
              onChange={(e) => setLoad(e.target.value)}
              value={load}
            />
            <label>Exercise reps:</label>
            <input
              type='number'
              onChange={(e) => setReps(e.target.value)}
              value={reps}
            />
            <button>Add Workout</button>
            {error && <div className='error'>Error: {error}</div>}
        </form> 
        
    )
}

export default WorkoutForm
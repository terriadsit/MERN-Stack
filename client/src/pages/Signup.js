import { useState } from 'react'

import { useUserContext } from '../hooks/useUserContext'

export default function Signup() {

  const { user, dispatch } = useUserContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  const API_URL = 'http://localhost:4000';

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {email, password}
    
    const response = await fetch(`${API_URL}/api/users/signup`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), //body must be a string
        })
    const json = await response.json()
        
    if (!response.ok) {
        setError(json.error)
        //setEmptyFields(json.emptyFields)
    }   
    if (response.ok) {
        dispatch({type: 'SIGNUP', payload: json})
        console.log('user added', json)
        setError('')
        setEmail('')
        setPassword(0)
        setEmptyFields([])
    }     
}
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <label>Password:</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Signup</button>
            {error && <div className='error'>Error: {error}</div>}
        </form>
    </div>
  )
}

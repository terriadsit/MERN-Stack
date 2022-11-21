import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user, dispatch } = useAuthContext()
  const API_URL = 'http://localhost:4000'

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)
   
    const response = await fetch(`${API_URL}/api/users/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}) //body must be a string
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
     
    }
    if (response.ok) {
     // update the auth context
      dispatch({ type: 'LOGIN', payload: json })
      console.log('user added', json)
       // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}

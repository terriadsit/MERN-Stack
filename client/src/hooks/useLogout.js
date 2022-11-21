import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from '../hooks/useWorkoutsContext'

export const useLogout = () => {
  const { dispatch: workoutDispatch } = useWorkoutContext()
  const { user, dispatch } = useAuthContext()

  const logout = async () => {
     // update the auth context
      dispatch({ type: 'LOGOUT' })
      workoutDispatch({type: 'SET_WORKOUTS', payload: null})
      console.log(user,'logged out')
       // remove the user from local storage
      localStorage.removeItem('user')
  }
  return { logout }
}

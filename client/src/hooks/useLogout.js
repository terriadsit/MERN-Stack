import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
 
  const { user, dispatch } = useAuthContext()

  const logout = async () => {
    
     // update the auth context
      dispatch({ type: 'LOGOUT' })
      console.log(user,'logged out')
       // remove the user from local storage
      localStorage.removeItem('user')
    
    
  }
  return { logout }
}

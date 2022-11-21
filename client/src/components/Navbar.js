import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
// link tag won't make a request to the backend, handles route locally in the browser


const Navbar = () => {
   
    const { user } = useAuthContext()
    const { logout } = useLogout()

       
    const handleClick = () => {
        logout()
       
    }
    return (
        <header>
            <div className="container">
                <Link to='/'>  
                    <h1>Workout Buddy</h1>
                </Link>
                {!user && 
                  <nav>
                     <Link to='/signup'> <h4>Signup</h4> </Link>
                     <Link to='/login'> <h4>Login</h4> </Link>
                  </nav>
                }
                {user && 
                  <nav>
                    <h4>Welcome {user.email}!</h4>
                    <button className='button' onClick={handleClick}>Logout</button>
                 </nav>
                }
                
            </div>
        </header>
    )
}

export default Navbar
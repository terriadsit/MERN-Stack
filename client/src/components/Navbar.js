import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
// link tag won't make a request to the backend, handles route locally in the browser


const Navbar = () => {
    const { user } = useAuthContext()
    return (
        <header>
            <div className="container">
                <Link to='/'>  
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                  {!user && <Link to='/signup'> <h4>Signup</h4> </Link>}
                  {!user && <Link to='/login'> <h4>Login</h4> </Link>}
                </nav>
                {user && <h4>Welcome {user.email}!</h4>}
                
            </div>
        </header>
    )
}

export default Navbar
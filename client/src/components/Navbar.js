import { Link } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
// link tag won't make a request to the backend, handles route locally in the browser


const Navbar = () => {
    const { user } = useUserContext()
    return (
        <header>
            <div className="container">
                <Link to='/'>  
                    <h1>Workout Buddy</h1>
                </Link>
                {!user && <Link to='/signup'> <h4>Signup</h4> </Link>}
                {user && <h4>Welcome {user.email}!</h4>}
                
            </div>
        </header>
    )
}

export default Navbar
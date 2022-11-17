import { Link } from 'react-router-dom'
// link tag won't make a request to the backend, handles route locally in the browser

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'>  
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar
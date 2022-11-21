import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar';

import { useAuthContext } from './hooks/useAuthContext'



function App() {
  const { dispatch } = useAuthContext()
  //const user = localStorage.getItem('user')

  // useEffect(() => {
  //   dispatch({type: 'LOGIN', payload: user})
  // }, [])
  
  
  //console.log(user, 'user in app')
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

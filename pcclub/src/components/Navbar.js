import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <nav>
      <h1>Kompiuterių Klubo Valdymas</h1>
      <ul>
        {user && <li><Link to="/">Pagrindinis</Link></li>}
        {user ? (
          <>
            <li><Link to="/computers">Kompiuteriai</Link></li>
            <li><button onClick={handleLogout}>Atsijungti</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Prisijungti</Link></li>
            <li><Link to="/register">Registruotis</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

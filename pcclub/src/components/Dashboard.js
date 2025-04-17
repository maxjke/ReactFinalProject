import React, { useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import API from '../services/api'
import { AuthContext } from '../context/AuthContext'
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [computers, setComputers] = useState([])

  useEffect(() => {
    if (!user) return
    API.get('/computers')
      .then(res => setComputers(res.data.slice(0, 6)))
      .catch(console.error)
  }, [user])

  if (!user) return <Navigate to="/login" />

  return (
    <div className="dashboard">
      <h1>Sveiki, {user.username}!</h1>
      <p className="dashboard-info">
        Čia galite peržiūrėti populiarus kompiuterius.
      </p>
      <div className="dashboard-cards">
        {computers.map(c => (
          <div key={c._id} className="card">
            <img
              src={`/assets/pc1.jpg`}
              alt={c.name}
            />
            <div className="card-content">
              <h3>{c.name}</h3>
              <p>GPU: {c.gpu}</p>
              <p>CPU: {c.cpu}</p>
              <p>RAM: {c.ram}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/register', formData)
      const { user } = res.data
      loginUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registracija nepavyko')
    }
  }
  return (
    <div>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Registruotis</button>
      </form>
    </div>
  )
}
export default Register

import React, { createContext, useState } from 'react'
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const loginUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

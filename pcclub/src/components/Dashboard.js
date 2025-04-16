import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div className="profile-info">
          <h3>Sveiki, {user.username}!</h3>
          <p>Jūsų el. paštas: {user.email}</p>
          <p>
            Kompiuterių klubas "Tech arena" - modernus informacinių technologijų centras, kuriame galite
            rezervuoti kompiuterius, dalyvauti renginiuose ir keistis patirtimi. Mūsų tikslas – suteikti
            profesionalią ir draugišką aplinką technologijų entuziastams.
          </p>
        </div>
      ) : (
        <p>Prašome prisijungti, kad matytumėte savo profilį ir naujienas.</p>
      )}
    </div>
  )
}

export default Dashboard

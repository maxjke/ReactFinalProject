import React, { useState, useEffect, useContext } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ComputerList = () => {
  const { user } = useContext(AuthContext)
  const [computers, setComputers] = useState([])

  useEffect(() => {
    API.get('/computers')
      .then(res => setComputers(res.data))
      .catch(err => console.error(err))
  }, [])

  const deleteComputer = async id => {
    try {
      await API.delete(`/computers/${id}`)
      setComputers(computers.filter(comp => comp._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const reserveComputer = async id => {
    try {
      await API.put(`/computers/${id}`, { reserved: true, reservedBy: user.email })
      const res = await API.get('/computers')
      setComputers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const cancelReservation = async id => {
    try {
      await API.put(`/computers/${id}`, { reserved: false, reservedBy: "" })
      const res = await API.get('/computers')
      setComputers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Kompiuteriai</h2>
      {user && user.role === "admin" && (
        <div className="btn-container">
          <Link to="/computers/new" className="btn">Pridėti naują kompiuterį</Link>
        </div>
      )}
      <div className="computer-list">
        {computers.map(computer => (
          <div key={computer._id} className="computer-item">
            <h3>{computer.name}</h3>
            <p>GPU: {computer.gpu}</p>
            <p>CPU: {computer.cpu}</p>
            <p>RAM: {computer.ram}</p>
            <p>MotherBoard: {computer.motherboard}</p>
            <p>Stalas: {computer.table}</p>
            {user && user.role === "admin" && (
              <>
                <Link to={`/computers/${computer._id}`} className="btn">Redaguoti</Link>
                <button className="btn btn-danger" onClick={() => deleteComputer(computer._id)}>Ištrinti</button>
              </>
            )}
            {user && user.role === "user" && (
              <>
                {computer.reserved ? (
                  computer.reservedBy === user.email ? (
                    <button className="btn" onClick={() => cancelReservation(computer._id)}>Atšaukti rezervaciją</button>
                  ) : (
                    <p>Rezervuotas</p>
                  )
                ) : (
                  <button className="btn" onClick={() => reserveComputer(computer._id)}>Rezervuoti</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComputerList

import React, { useState, useEffect, useContext, useMemo } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const COMPUTER_FILTERS = {
  gpu: ['', 'NVIDIA RTX 3080', 'NVIDIA RTX 3070', 'AMD Radeon RX 6800 XT'],
  cpu: ['', 'Intel Core i9-11900K', 'AMD Ryzen 9 5950X', 'Intel Core i7-11700K'],
  ram: ['', 'Corsair Vengeance 16GB', 'G.Skill Trident Z 16GB', 'Kingston HyperX Fury 16GB'],
  motherboard: ['', 'ASUS ROG Strix', 'MSI MPG Z490', 'Gigabyte Aorus Xtreme']
}

const SORT_OPTIONS = [
  { value: 'table_asc', label: 'Stalas ↑' },
  { value: 'table_desc', label: 'Stalas ↓' },
  { value: 'name_asc', label: 'Pavadinimas ↑' },
  { value: 'name_desc', label: 'Pavadinimas ↓' }
]

export default function ComputerList() {
  const { user } = useContext(AuthContext)
  const [computers, setComputers] = useState([])
  const [filters, setFilters] = useState({ gpu: '', cpu: '', ram: '', motherboard: '' })
  const [sortBy, setSortBy] = useState('table_asc')

  useEffect(() => {
    API.get('/computers').then(r => setComputers(r.data)).catch(console.error)
  }, [])

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSortChange = e => {
    setSortBy(e.target.value)
  }

  const filteredAndSorted = useMemo(() => {
    return computers
      .filter(c =>
        (!filters.gpu  || c.gpu  === filters.gpu) &&
        (!filters.cpu  || c.cpu  === filters.cpu) &&
        (!filters.ram  || c.ram  === filters.ram) &&
        (!filters.motherboard || c.motherboard === filters.motherboard)
      )
      .sort((a, b) => {
        const [field, dir] = sortBy.split('_')
        const res = field === 'table'
          ? a.table - b.table
          : a.name.localeCompare(b.name)
        return dir === 'asc' ? res : -res
      })
  }, [computers, filters, sortBy])

  const reserveComputer = async id => {
    await API.put(`/computers/${id}`, {
      reserved: true,
      reservedBy: user.email
    })
    const r = await API.get('/computers')
    setComputers(r.data)
  }

  const cancelReservation = async id => {
    await API.put(`/computers/${id}`, {
      reserved: false,
      reservedBy: ''
    })
    setComputers(computers.map(c =>
      c._id === id
        ? { ...c, reserved: false, reservedBy: '' }
        : c
    ))
  }

  const deleteComputer = async id => {
    await API.delete(`/computers/${id}`)
    setComputers(computers.filter(c => c._id !== id))
  }

  return (
    <div>
      <h2>Kompiuteriai</h2>
      {user?.role === 'admin' && (
        <div className="btn-container">
          <Link to="/computers/new" className="btn">Pridėti naują kompiuterį</Link>
        </div>
      )}
      <div className="filter-sort-container">
        {Object.entries(COMPUTER_FILTERS).map(([key, opts]) => (
          <select key={key} name={key} value={filters[key]} onChange={handleFilterChange}>
            <option value="">{`Filtruoti pagal ${key.toUpperCase()}`}</option>
            {opts.filter(o => o).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}
        <select value={sortBy} onChange={handleSortChange}>
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="computer-list">
        {filteredAndSorted.map(c => (
          <div key={c._id} className="computer-item">
            <h3>{c.name}</h3>
            <p>GPU: {c.gpu}</p>
            <p>CPU: {c.cpu}</p>
            <p>RAM: {c.ram}</p>
            <p>MotherBoard: {c.motherboard}</p>
            <p>Stalas: {c.table}</p>

            {c.reserved ? (
              <p>Rezervuota vartotojo: {c.reservedBy}</p>
            ) : user?.role === 'user' ? (
              <button className="btn" onClick={() => reserveComputer(c._id)}>Rezervuoti</button>
            ) : null}

            {c.reserved && c.reservedBy === user?.email && (
              <button className="btn btn-danger" onClick={() => cancelReservation(c._id)}>
                Atšaukti rezervaciją
              </button>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to={`/computers/${c._id}`} className="btn">Redaguoti</Link>
                <button className="btn btn-danger" onClick={() => deleteComputer(c._id)}>Ištrinti</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

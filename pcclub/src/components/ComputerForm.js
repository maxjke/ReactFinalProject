import React, { useState, useContext } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const ComputerForm = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    available: true,
    gpu: '',
    cpu: '',
    ram: '',
    motherboard: '',
    table: ''
  })
  const [error, setError] = useState('')
  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.gpu || !formData.cpu || !formData.ram || !formData.motherboard || !formData.table) {
      setError('Prašome užpildyti visus laukus')
      return
    }
    try {
      await API.post('/computers', { ...formData, table: Number(formData.table) })
      navigate('/computers')
    } catch (err) {
      setError(err.response?.data?.message || 'Klaida kuriant kompiuterį')
    }
  }
  if (!user || user.role !== "admin") return <p>Neturite teisių prieiti šiai svetainei.</p>
  return (
    <div>
      <h2>Pridėti naują kompiuterį</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pavadinimas:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Galima naudoti:</label>
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
        </div>
        <div>
          <label>GPU:</label>
          <select name="gpu" value={formData.gpu} onChange={handleChange} required>
            <option value="">Pasirinkite GPU</option>
            <option value="NVIDIA RTX 3080">NVIDIA RTX 3080</option>
            <option value="NVIDIA RTX 3070">NVIDIA RTX 3070</option>
            <option value="AMD Radeon RX 6800 XT">AMD Radeon RX 6800 XT</option>
          </select>
        </div>
        <div>
          <label>CPU:</label>
          <select name="cpu" value={formData.cpu} onChange={handleChange} required>
            <option value="">Pasirinkite CPU</option>
            <option value="Intel Core i9-11900K">Intel Core i9-11900K</option>
            <option value="AMD Ryzen 9 5950X">AMD Ryzen 9 5950X</option>
            <option value="Intel Core i7-11700K">Intel Core i7-11700K</option>
          </select>
        </div>
        <div>
          <label>RAM:</label>
          <select name="ram" value={formData.ram} onChange={handleChange} required>
            <option value="">Pasirinkite RAM</option>
            <option value="Corsair Vengeance 16GB">Corsair Vengeance 16GB</option>
            <option value="G.Skill Trident Z 16GB">G.Skill Trident Z 16GB</option>
            <option value="Kingston HyperX Fury 16GB">Kingston HyperX Fury 16GB</option>
          </select>
        </div>
        <div>
          <label>MotherBoard:</label>
          <select name="motherboard" value={formData.motherboard} onChange={handleChange} required>
            <option value="">Pasirinkite MotherBoard</option>
            <option value="ASUS ROG Strix">ASUS ROG Strix</option>
            <option value="MSI MPG Z490">MSI MPG Z490</option>
            <option value="Gigabyte Aorus Xtreme">Gigabyte Aorus Xtreme</option>
          </select>
        </div>
        <div>
          <label>Stalas:</label>
          <input type="number" name="table" value={formData.table} onChange={handleChange} required />
        </div>
        <button type="submit">Siųsti</button>
      </form>
    </div>
  )
}
export default ComputerForm

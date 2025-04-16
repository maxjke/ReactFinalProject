import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ComputerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [computer, setComputer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    available: false,
    gpu: '',
    cpu: '',
    ram: '',
    motherboard: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComputer = async () => {
      try {
        const res = await API.get(`/computers/${id}`);
        setComputer(res.data);
        setFormData({
          name: res.data.name,
          available: res.data.available,
          gpu: res.data.gpu,
          cpu: res.data.cpu,
          ram: res.data.ram,
          motherboard: res.data.motherboard,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchComputer();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/computers/${id}`, formData);
      navigate('/computers');
    } catch (err) {
      setError('Klaida atnaujinant kompiuterį');
    }
  };

  if (!computer) return <p>Įkeliama...</p>;

  return (
    <div>
      <h2>Redaguoti kompiuterį</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pavadinimas:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Galima naudoti:</label>
          <input 
            type="checkbox" 
            name="available" 
            checked={formData.available} 
            onChange={handleChange} 
          />
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
        <button type="submit">Atnaujinti</button>
      </form>
    </div>
  );
};

export default ComputerDetails;

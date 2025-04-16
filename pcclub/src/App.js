// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ComputerList from './components/ComputerList';
import ComputerForm from './components/ComputerForm';
import ComputerDetails from './components/ComputerDetails';
import { AuthProvider } from './context/AuthContext';
import './App.css';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/computers" element={<ComputerList />} />
            <Route path="/computers/new" element={<ComputerForm />} />
            <Route path="/computers/:id" element={<ComputerDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "Vartotojas jau egzistuoja" })
    const role = email === "admin@gmail.com" ? "admin" : "user"
    user = new User({ username, email, password, role })
    await user.save()
    res.status(201).json({ message: "Registracija sėkminga", user: { username, email, role } })
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Neteisingi duomenys" })
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: "Neteisingi duomenys" })
    res.json({ message: "Prisijungimas sėkmingas", user: { username: user.username, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

module.exports = router

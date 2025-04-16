const express = require('express')
const router = express.Router()
const Computer = require('../models/Computer')

router.get('/', async (req, res) => {
  try {
    const computers = await Computer.find()
    res.json(computers)
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id)
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" })
    res.json(computer)
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

router.post('/', async (req, res) => {
  const { name, available, gpu, cpu, ram, motherboard, table } = req.body
  try {
    const computer = new Computer({ name, available, gpu, cpu, ram, motherboard, table })
    await computer.save()
    res.status(201).json(computer)
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

router.put('/:id', async (req, res) => {
  const { name, available, gpu, cpu, ram, motherboard, table, reserved, reservedBy } = req.body
  try {
    let computer = await Computer.findById(req.params.id)
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" })
    computer.name = name || computer.name
    computer.available = available !== undefined ? available : computer.available
    computer.gpu = gpu || computer.gpu
    computer.cpu = cpu || computer.cpu
    computer.ram = ram || computer.ram
    computer.motherboard = motherboard || computer.motherboard
    computer.table = table !== undefined ? table : computer.table
    computer.reserved = reserved !== undefined ? reserved : computer.reserved
    computer.reservedBy = reservedBy || computer.reservedBy
    await computer.save()
    res.json(computer)
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id)
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" })
    await computer.remove()
    res.json({ message: "Kompiuteris ištrintas" })
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" })
  }
})

module.exports = router

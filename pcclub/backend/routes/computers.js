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
  const {
    name,
    available,
    gpu,
    cpu,
    ram,
    motherboard,
    table,
    reserved,
    reservedBy,
    reservationTime
  } = req.body

  try {
    const computer = await Computer.findById(req.params.id)
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" })

    if (name !== undefined)           computer.name = name
    if (available !== undefined)      computer.available = available
    if (gpu !== undefined)            computer.gpu = gpu
    if (cpu !== undefined)            computer.cpu = cpu
    if (ram !== undefined)            computer.ram = ram
    if (motherboard !== undefined)    computer.motherboard = motherboard
    if (table !== undefined)          computer.table = table
    if (reserved !== undefined)       computer.reserved = reserved
    if (reservedBy !== undefined)     computer.reservedBy = reservedBy

    if (reservationTime !== undefined) {
      computer.reservationTime = reservationTime
        ? new Date(reservationTime)
        : null
    }

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

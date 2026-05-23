const express = require('express');
const router = express.Router();
const { Table, Reservation } = require('../models');
const { Op } = require('sequelize');

// GET /api/tables/available?date=2026-05-25&slot=7:00 PM&guests=2
router.get('/available', async (req, res) => {
  try {
    const { date, slot, guests } = req.query;

    if (!date || !slot || !guests) {
      return res.status(400).json({ message: 'date, slot aur guests required hain' });
    }

    const guestsNum = parseInt(guests);

    // Us date+slot pe already booked tables find karo
    const bookedReservations = await Reservation.findAll({
      where: { date, slot, status: 'reserved' }
    });

    const bookedTableIds = bookedReservations.map(r => r.tableId);

    // ✅ status check hata diya — sirf date+slot booking check hoga
    const availableTables = await Table.findAll({
      where: {
        seats: { [Op.gte]: guestsNum },
        id: { [Op.notIn]: bookedTableIds.length > 0 ? bookedTableIds : [0] }
      },
      order: [['seats', 'ASC']]
    });

    res.json(availableTables);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tables — sari tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.findAll({ order: [['id', 'ASC']] })
    res.json(tables)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/tables/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const table = await Table.findByPk(req.params.id)
    if (!table) return res.status(404).json({ message: 'Table nahi mili' })
    await table.update({ status })
    res.json({ message: 'Status updated', table })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router;
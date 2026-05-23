const express = require('express');
const router = express.Router();
const { Reservation, Table, Slot } = require('../models');
const { Op } = require('sequelize');

// POST /api/reservations
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, guests, date, slot, tableId } = req.body;

    // 1. Double booking check — same table, same date, same slot
    const existing = await Reservation.findOne({
      where: { date, slot, tableId, status: 'reserved' }
    });

    if (existing) {
      return res.status(400).json({ message: 'Ye table is slot mein already booked hai' });
    }

    // 2. Table find karo
    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ message: 'Table nahi mili' });
    }

    // 3. Reservation banao
    const reservation = await Reservation.create({
      customerName,
      phone,
      guests,
      date,
      slot,
      tableId,
      status: 'reserved'
    });

    // 4. Table status update karo
    await table.update({ status: 'reserved' });

    res.status(201).json({
      message: 'Reservation successful!',
      reservation
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reservations — sari reservations dekho
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [{ model: Table }],
      order: [['createdAt', 'DESC']]
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
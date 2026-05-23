const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Reservation = sequelize.define("Reservation", {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  slot: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "reserved",
  },

  // ✅ YE ADD HUA
  slotId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Slots",
      key: "id",
    },
  },

  // ✅ YE BHI ADD HUA
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Tables",
      key: "id",
    },
  },
});

module.exports = Reservation;
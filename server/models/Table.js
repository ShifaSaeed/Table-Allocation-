const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Table = sequelize.define("Table", {
  tableNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "available",
  },

  occupiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  lastEmptyAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Table;
const Table = require('./Table');
const Reservation = require('./Reservation');
const Slot = require('./Slot');

// Relationships
Table.hasMany(Reservation, { foreignKey: 'tableId' });
Reservation.belongsTo(Table, { foreignKey: 'tableId' });

Slot.hasMany(Reservation, { foreignKey: 'slotId' });
Reservation.belongsTo(Slot, { foreignKey: 'slotId' });

module.exports = { Table, Reservation, Slot };
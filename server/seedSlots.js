const { sequelize } = require('./config/db');
const { Slot } = require('./models');

const times = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const seedSlots = async () => {
  await sequelize.authenticate();

  const testDate = '2026-05-25';

  const slots = times.map(time => ({
    time,
    date: testDate,
    isAvailable: true
  }));

  await Slot.bulkCreate(slots);
  console.log('✅ Slots seeded successfully!');
  process.exit();
};

seedSlots();
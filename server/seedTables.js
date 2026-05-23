const { sequelize } = require("./config/db");
const Table = require("./models/Table");

const seedTables = async () => {
  try {

    await sequelize.sync();

    // OLD DATA DELETE
    await Table.destroy({
      where: {},
    });

    // INSERT TABLES
    await Table.bulkCreate([
      {
        tableNumber: "T1",
        seats: 2,
      },
      {
        tableNumber: "T2",
        seats: 2,
      },
      {
        tableNumber: "T3",
        seats: 4,
      },
      {
        tableNumber: "T4",
        seats: 4,
      },
      {
        tableNumber: "T5",
        seats: 6,
      },
    ]);

    console.log("Tables Inserted Successfully");

    process.exit();

  } catch (error) {
    console.log(error);
  }
};

seedTables();
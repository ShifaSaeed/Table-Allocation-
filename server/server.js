const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reservationRoutes = require("./routes/reservationRoutes");
const { connectDB, sequelize } = require("./config/db");
const slotRoutes = require('./routes/slotRoutes');
const tableRoutes = require('./routes/tableRoutes');

dotenv.config();

connectDB();

require("./models");

const app = express();

// ✅ CORS AUR JSON PEHLE HONA CHAHIYE
app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/tables', tableRoutes); 

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tables Synced");
  });

app.get("/", (req, res) => {
  res.send("SmartDineN API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
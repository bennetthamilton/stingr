// index.js
const express = require('express');
const app = express();
const bookingRoutes = require('./booking');

app.use(express.json());
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
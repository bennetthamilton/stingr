// index.js
const express = require('express');
const app = express();
const bookingRoutes = require('./booking');

app.use(express.json());
app.use('/bookings', bookingRoutes);

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log("Server running on port 3000"));
}
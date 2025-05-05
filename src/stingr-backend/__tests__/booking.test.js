const request = require('supertest');
const app = require('../api/index'); // Ensure index.js exports app

const testBooking = {
  booking_id: 'test-booking-123',
  date_booked: '2025-05-04',
  client: 'Test Client',
  artist: 'Test Artist',
  appointment_date: '2025-06-01',
  status: 'confirmed',
  description: 'Test description'
};

describe('Booking API Routes', () => {
  it('should create a new booking', async () => {
    const res = await request(app).put('/bookings').send(testBooking);
    console.log("PUT /bookings response:", res.statusCode, res.text);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(testBooking.booking_id);
  });

  it('should get all bookings', async () => {
    const res = await request(app).get('/bookings');
    console.log("GET /bookings response:", res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a booking by ID', async () => {
    const res = await request(app).get(`/bookings/${testBooking.booking_id}`);
    console.log("GET /bookings/:id response:", res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.booking_id).toBe(testBooking.booking_id);
  });

  it('should search bookings by artist', async () => {
    const res = await request(app).get(`/bookings/search/artist/${testBooking.artist}`);
    console.log("GET /search/artist response:", res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should search bookings by client', async () => {
    const res = await request(app).get(`/bookings/search/client/${testBooking.client}`);
    console.log("GET /search/client response:", res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should search bookings by appointment date', async () => {
    const res = await request(app).get(`/bookings/search/appointment/${testBooking.appointment_date}`);
    console.log("GET /search/appointment response:", res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should delete a booking by ID', async () => {
    const res = await request(app).delete(`/bookings/${testBooking.booking_id}`);
    console.log("DELETE /bookings/:id response:", res.statusCode, res.text);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(testBooking.booking_id);
  });
});

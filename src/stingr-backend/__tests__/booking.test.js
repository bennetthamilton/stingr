const request = require('supertest');
const app = require('../index'); // Ensure index.js exports app

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
  // Create or update a booking
  it('should create a new booking', async () => {
    const res = await request(app)
      .put('/bookings')
      .send(testBooking);

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(testBooking.booking_id);
  });

  // Get all bookings
  it('should get all bookings', async () => {
    const res = await request(app).get('/bookings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Get booking by ID
  it('should get a booking by ID', async () => {
    const res = await request(app).get(`/bookings/${testBooking.booking_id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.booking_id).toBe(testBooking.booking_id);
  });

  // Search by artist
  it('should search bookings by artist', async () => {
    const res = await request(app).get(`/bookings/search/artist/${testBooking.artist}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Search by client
  it('should search bookings by client', async () => {
    const res = await request(app).get(`/bookings/search/client/${testBooking.client}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Search by appointment date
  it('should search bookings by appointment date', async () => {
    const res = await request(app).get(`/bookings/search/appointment/${testBooking.appointment_date}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Delete booking
  it('should delete a booking by ID', async () => {
    const res = await request(app).delete(`/bookings/${testBooking.booking_id}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(testBooking.booking_id);
  });
});

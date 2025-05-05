// booking.js
const express = require('express');
const router = express.Router();
const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "booking";

// Query bookings by artist
router.get('/search/artist/:artist', async (req, res) => {
    try {
      const result = await dynamo.send(new ScanCommand({
        TableName: tableName,
        FilterExpression: "#artist = :artistVal",
        ExpressionAttributeNames: { "#artist": "artist" },
        ExpressionAttributeValues: { ":artistVal": req.params.artist },
      }));
      res.json(result.Items || []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Query bookings by client
router.get('/search/client/:client', async (req, res) => {
    try {
      const result = await dynamo.send(new ScanCommand({
        TableName: tableName,
        FilterExpression: "#client = :clientVal",
        ExpressionAttributeNames: { "#client": "client" },
        ExpressionAttributeValues: { ":clientVal": req.params.client },
      }));
      res.json(result.Items || []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Query bookings by appointment date
router.get('/search/appointment/:date', async (req, res) => {
    try {
      const result = await dynamo.send(new ScanCommand({
        TableName: tableName,
        FilterExpression: "#date = :dateVal",
        ExpressionAttributeNames: { "#date": "appointment_date" },
        ExpressionAttributeValues: { ":dateVal": req.params.date },
      }));
      res.json(result.Items || []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// GET /bookings/:booking_id
router.get('/:booking_id', async (req, res) => {
  try {
    const result = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: { booking_id: req.params.booking_id },
      })
    );
    res.json(result.Item || {});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /bookings
router.get('/', async (req, res) => {
  try {
    const result = await dynamo.send(
      new ScanCommand({ TableName: tableName })
    );
    res.json(result.Items || []);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /bookings
router.put('/', async (req, res) => {
  const {
    booking_id,
    date_booked,
    client,
    artist,
    appointment_date,
    status,
    description,
  } = req.body;

  if (!booking_id) {
    return res.status(400).json({ error: "booking_id is required" });
  }

  try {
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          booking_id,
          date_booked,
          client,
          artist,
          appointment_date,
          status,
          description,
        },
      })
    );
    res.json({ message: `Created/updated booking ${booking_id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /bookings/:booking_id
router.delete('/:booking_id', async (req, res) => {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { booking_id: req.params.booking_id },
      })
    );
    res.json({ message: `Deleted booking ${req.params.booking_id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

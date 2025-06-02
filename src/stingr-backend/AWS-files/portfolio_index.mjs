const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'portfolio';

exports.handler = async (event) => {
  const method = event.httpMethod;

  if (method === 'GET') {
    const name = event.queryStringParameters?.name;

    if (name) {
      // 🔍 Get profile by name
      try {
        const result = await dynamoDb.get({
          TableName: TABLE_NAME,
          Key: { name }
        }).promise();

        if (!result.Item) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Profile not found' })
          };
        }

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(result.Item),
        };
      } catch (err) {
        console.error('GET by name error:', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error retrieving profile' }),
        };
      }
    } else {
      // 📋 Get all profiles
      try {
        const data = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data.Items),
        };
      } catch (err) {
        console.error('GET all error:', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error retrieving profiles' }),
        };
      }
    }
  }

  if (method === 'POST') {
    // ➕ Add new profile
    try {
      const body = JSON.parse(event.body);
      const { name, bio, profile_pic, art_pictures, styles, location } = body;

      if (!name || !bio || !profile_pic || !Array.isArray(art_pictures) || !Array.isArray(styles) || !location) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing or invalid fields' }),
        };
      }

      const newItem = { name, bio, profile_pic, art_pictures, styles, location };

      await dynamoDb.put({
        TableName: TABLE_NAME,
        Item: newItem,
      }).promise();

      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Profile added', item: newItem }),
      };
    } catch (err) {
      console.error('POST error:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to add profile' }),
      };
    }
  }

  // ❌ Method Not Allowed
  return {
    statusCode: 405,
    headers: { 'Allow': 'GET, POST' },
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "booking";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "GET /bookings/artist/{artist}":
        body = await dynamo.send(new ScanCommand({
          TableName: tableName,
          FilterExpression: "#artist = :artistVal",
          ExpressionAttributeNames: { "#artist": "artist" },
          ExpressionAttributeValues: { ":artistVal": event.pathParameters.artist },
        }));
        body = body.Items;
        break;
      case "GET /bookings/client/{client}":
        body = await dynamo.send(new ScanCommand({
          TableName: tableName,
          FilterExpression: "#client = :clientVal",
          ExpressionAttributeNames: { "#client": "client" },
          ExpressionAttributeValues: { ":clientVal": event.pathParameters.client },
        }));
        body = body.Items;
        break;
      case "GET /bookings/appointment/{date}":
        body = await dynamo.send(new ScanCommand({
          TableName: tableName,
          FilterExpression: "#date = :dateVal",
          ExpressionAttributeNames: { "#date": "appointment_date" },
          ExpressionAttributeValues: { ":dateVal": event.pathParameters.date },
        }));
        body = body.Items;
        break;
      case "DELETE /bookings/{booking_id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              booking_id: event.pathParameters.booking_id,
            },
          })
        );
        body = `Deleted booking ${event.pathParameters.booking_id}`;
        break;
      case "GET /bookings/{booking_id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              booking_id: event.pathParameters.booking_id,
            },
          })
        );
        body = body.Item;
        break;
      case "GET /bookings":
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        body = body.Items;
        break;
      case "PUT /bookings":
        const requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              booking_id: requestJSON.booking_id,
              date_booked: requestJSON.date_booked,
              client: requestJSON.client,
              artist: requestJSON.artist,
              phone: requestJSON.phone,
              email: requestJSON.email,
              appointment_date: requestJSON.appointment_date,
              appointment_type: requestJSON.appointment_type,
              description: requestJSON.description,
            },
          })
        );
        body = `Created/updated booking ${requestJSON.booking_id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

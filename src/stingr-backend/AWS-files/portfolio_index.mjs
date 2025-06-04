import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "portfolio";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "GET /profile":
        const scanResult = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = scanResult.Items;
        break;

      case "GET /profile/{name}":
        const getResult = await dynamo.send(new GetCommand({
          TableName: tableName,
          Key: { id: event.pathParameters.name },
        }));
        body = getResult.Item || { error: "Profile not found" };
        break;

      case "PUT /profile":
        const requestJSON = JSON.parse(event.body);
        const { name, bio, profile_pic, art_pictures, styles, location } = requestJSON;

        // Validate fields
        if (!name || !bio || !profile_pic || !Array.isArray(art_pictures) || !Array.isArray(styles) || !location) {
          throw new Error("Missing or invalid fields");
        }

        // Use name as the ID
        const id = name;

        await dynamo.send(new PutCommand({
          TableName: tableName,
          Item: { id, name, bio, profile_pic, art_pictures, styles, location },
        }));
        body = `Created/updated profile for ${name}`;
        break;

      case "DELETE /profile/{name}":
        await dynamo.send(new DeleteCommand({
          TableName: tableName,
          Key: { id: event.pathParameters.name },
        }));
        body = `Deleted profile ${event.pathParameters.name}`;
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = JSON.stringify({ error: err.message });
  }

  return {
    statusCode,
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers,
  };
};

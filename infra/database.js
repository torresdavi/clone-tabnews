import { Client } from "pg";

async function query(queryObject) {
  // defines the client to connect, passing the credentials
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
  });

  // connect with client
  await client.connect();

  // call the method query from client passing the query object
  const result = await client.query(queryObject);

  // closes the connection
  await client.end();
  return result;
}

export default {
  query: query,
};

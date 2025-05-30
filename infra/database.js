import { Client } from "pg";

async function query(queryObject) {
  // defines the client to connect, passing the credentials
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSslValues(),
  });

  console.log("Production Credentials:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  // connect with client
  await client.connect();

  try {
    // call the method query from client passing the query object
    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // closes the connection
    await client.end();
  }
}

export default {
  query: query,
};

function getSslValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "development" ? false : true;
}

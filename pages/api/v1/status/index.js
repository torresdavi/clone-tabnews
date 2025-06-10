// pages/api/v1/status/index.js
import database from "infra/database.js";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const dbOpenedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionString = dbVersion.rows[0].server_version;
  const parsedDbMaxConnections = parseInt(
    dbMaxConnections.rows[0].max_connections,
  );

  // use length instead of rows[0].count, because count return all the opened connections
  // and we want only the actual opened connection
  const parsedDbOpennedConnections = dbOpenedConnections.rows.length;
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionString,
        max_connections: parsedDbMaxConnections,
        active_connections: parsedDbOpennedConnections,
      },
    },
  });
}

export default status;

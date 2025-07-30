// pages/api/v1/status/index.js
import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller";

// Router
const router = createRouter();
router.get(getHandler);

export default router.handler(controller.errorHandlers);

// Functions
async function getHandler(request, response) {
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

  const parsedDbOpenedConnections = dbOpenedConnections.rows[0].count;
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionString,
        max_connections: parsedDbMaxConnections,
        active_connections: parsedDbOpenedConnections,
      },
    },
  });
}

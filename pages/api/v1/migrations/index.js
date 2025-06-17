import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  try {
    switch (request.method) {
      case "GET":
        const pendingMigrations = await migrationRunner(
          defaultMigrationOptions,
        );
        return response.status(200).json(pendingMigrations);
        break;
      case "POST":
        // using spread to retrieve values from defaultMigrationOptions
        // and overwrite dryRun value
        const migratedMigrations = await migrationRunner({
          ...defaultMigrationOptions,
          dryRun: false,
        });

        if (migratedMigrations.length > 0) {
          return response.status(201).json(migratedMigrations);
          break;
        }

        return response.status(200).json(migratedMigrations);
        break;
      default:
        // returns 405 to not allowed for the others requisitions
        return response.status(405).end();
        break;
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}

import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const pgVersion = await database.query("SELECT version();");
  const pgMaxConnections = await database.query("SHOW max_connections;");
  const pgActiveConnections = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active'",
  );

  const pgVersionString = pgVersion.rows[0]["version"];
  const parsedPgMaxConnections = parseInt(
    pgMaxConnections.rows[0]["max_connections"],
    10,
  );

  const parsedActiveConnections = parseInt(
    pgActiveConnections.rows[0]["count"],
    10,
  );

  response.status(200).json({
    updated_at: updatedAt,
    pg_version: pgVersionString,
    pg_max_connections: parsedPgMaxConnections,
    pg_active_connections: parsedActiveConnections,
  });
}

export default status;

// Desafio: Retornar Versão do Postgres, Qtd de conexões máximas e conexões usadas

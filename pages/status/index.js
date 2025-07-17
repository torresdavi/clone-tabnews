import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <StatusData />
    </>
  );
}

function StatusData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let [
    updatedAtText,
    databaseVersionText,
    databaseMaxConnections,
    databaseActiveConnections,
  ] = Array(4).fill("Carregando...");

  if (!isLoading && data) {
    const database = data.dependencies.database;

    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    databaseVersionText = database.version;
    databaseMaxConnections = database.max_connections;
    databaseActiveConnections = database.active_connections;
  }

  return (
    <>
      <p>
        <b>Última atualização:</b> {updatedAtText}
      </p>
      <h1>Banco de Dados</h1>
      <p>
        <b>Versão do Banco de Dados:</b> {databaseVersionText}
      </p>
      <p>
        <b>Máximo de Conexões do Banco de Dados:</b> {databaseMaxConnections}
      </p>
      <p>
        <b>Conexões Ativas:</b> {databaseActiveConnections}
      </p>
    </>
  );
}

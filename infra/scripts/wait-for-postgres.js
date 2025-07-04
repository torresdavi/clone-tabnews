const { exec } = require("node:child_process"); // o comando que executaremos vem desse módulo declarado

function checkPostgres() {
  // Aqui executamos um comando no container postgres-dev para verificar se está ready, ou seja, aceitando conexões
  // Os parâmetros do exec são uma string seguido de uma função
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    // Aqui utilizamos o método search para retornar se encontrou (0) ou não (-1) a mensagem accepting connections
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");

      // Aqui chamamos a função dentro dela mesma (recursão) para fazer o procedimento de novo até ter um resultado diferente
      // e sair do if e imprimir a mensagem de sucesso
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();

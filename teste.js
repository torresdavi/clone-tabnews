class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

function salvarUsuario(input) {
  if (!input) {
    throw new ReferenceError("É necessário enviar um 'input'.");
  }

  if (!input.name) {
    throw new ValidationError("Preencha o seu nome completo.");
  }

  if (!input.username) {
    throw new ValidationError("Preencha seu apelido.");
  }

  if (!input.age) {
    throw new ValidationError("Preencha a sua idade.");
  }
}

try {
  salvarUsuario({
    name: "Davi Martins Torres",
    username: "davizão",
    age: "",
  });
} catch (error) {
  if (error instanceof ReferenceError) {
    throw error;
  }

  if (error instanceof ValidationError) {
    throw error;
  }

  console.log(error.stack);
}

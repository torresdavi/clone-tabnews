export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com um dos administradores.";
    this.status_code = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}

// {
//  "name": "NomeDoErro",
//  "message": "Mensagem explicando o que aconteceu",
//  "action": "Mensagem recomendando fazer alguma ação",
//  "status_code": 500
// }
//
//

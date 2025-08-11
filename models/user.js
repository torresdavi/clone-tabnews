import database from "infra/database";
import { ValidationError } from "infra/errors.js";

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validatePresenceEmail(userInputValues.email);
  await validateUniqueUsername(userInputValues.username);
  await validatePresenceUsername(userInputValues.username);

  const newUser = await runInsertQuery(userInputValues);
  return newUser;

  async function validatePresenceEmail(email) {
    if (!email || email === "") {
      throw new ValidationError({
        message: "O e-mail não pode ficar em branco.",
        action: "Preencha um e-mail válido.",
      });
    }
  }

  async function validatePresenceUsername(username) {
    if (!username || username === "") {
      throw new ValidationError({
        message: "O username não pode ficar em branco.",
        action: "Preencha um username válido.",
      });
    }
  }

  async function validateUniqueEmail(email) {
    const results = await database.query({
      text: `
        SELECT
          email
        FROM
          users
        WHERE
          LOWER(email) = LOWER($1)
          `,
      values: [email],
    });
    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "O e-mail informado já está sendo utilizado.",
        action: "Utilize outro e-mail para realizar o cadastro.",
      });
    }
  }

  async function validateUniqueUsername(username) {
    const results = await database.query({
      text: `
        SELECT
          username
        FROM
          users
        WHERE
          LOWER(username) = LOWER($1)
          `,
      values: [username],
    });
    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "O username informado já está sendo utilizado.",
        action: "Utilize outro username para realizar o cadastro.",
      });
    }
  }

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO
          users(username, email, password)
        VALUES
          (LOWER($1), LOWER($2), $3)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return results.rows[0];
  }
}

const user = {
  create,
};

export default user;

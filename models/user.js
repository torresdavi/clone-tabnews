import database from "infra/database";
import { NotFoundError, ValidationError } from "infra/errors.js";

// Validations //
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
        ;`,
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
        ;`,
    values: [username],
  });
  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "O username informado já está sendo utilizado.",
      action: "Utilize outro username para realizar o cadastro.",
    });
  }
}
// End Validations //

// Class methods //
async function findByUserName(username) {
  const userFound = await runSelectQuery(username);
  return userFound;

  async function runSelectQuery(username) {
    const result = await database.query({
      text: `SELECT
      *
    FROM
      users
    WHERE
      LOWER(username) = LOWER($1)
    LIMIT
      1
    ;`,
      values: [username],
    });
    if (result.rowCount === 0) {
      throw new NotFoundError({
        message: "O usuário não foi encontrado.",
        action: "Verifique se o username foi digitado corretamente.",
      });
    }

    return result.rows[0];
  }
}

// create user
async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validatePresenceEmail(userInputValues.email);
  await validateUniqueUsername(userInputValues.username);
  await validatePresenceUsername(userInputValues.username);

  const newUser = await runInsertQuery(userInputValues);
  return newUser;

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

// update user
async function update(username, userInputValues) {
  if (userInputValues.email) {
    await validateUniqueEmail(userInputValues.email);
    await validatePresenceEmail(userInputValues.email);
  }

  if (userInputValues.username) {
    await validateUniqueUsername(userInputValues.username);
    await validatePresenceUsername(userInputValues.username);
  }

  const updatedUser = await runUpdateQuery(username, userInputValues);
  return updatedUser;

  async function runUpdateQuery(username, userInputValues) {
    const results = await database.query({
      text: `
        UPDATE
          users
        SET
          username = COALESCE(LOWER($1), username),
          email = COALESCE(LOWER($2), email),
          password = COALESCE(LOWER($3), password)
        WHERE
          username = LOWER($4)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
        username,
      ],
    });

    return results.rows[0];
  }
}
// End Class methods //

const user = {
  create,
  update,
  findByUserName,
};

export default user;

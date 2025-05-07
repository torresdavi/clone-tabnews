import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  response.status(200).json({ eu: "sou o máximo", voce: "não é o máximo" });
  console.log(result.rows);
}

export default status;

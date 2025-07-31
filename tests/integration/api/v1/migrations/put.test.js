// tests/integration/api/v1/migrations/put.test.js
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("PUT api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Updating Migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });

      const responseBody = await response.json();
      expect(response.status).toBe(405);
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint.",
        action:
          "Verifique se o método HTTP enviado é valido para este endpoint.",
        status_code: 405,
      });
    });
  });
});

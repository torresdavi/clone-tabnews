// tests/integration/api/v1/status/get.test.js
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving status code", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);
    });

    test("Retrieving not allowed error", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este enpoint.",
        action:
          "Verifique se o método HTTP enviado é valido para este endpoint.",
        status_code: 405,
      });
    });
  });
});

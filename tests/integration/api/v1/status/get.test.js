// tests/integration/api/v1/status/get.test.js
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving status code", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
    });

    test("Retrieving Postgres Version", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();

      expect(responseBody.dependencies.database.version).toEqual("16.0");
    });

    test("Retrieving Postgres Max Connections", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();

      expect(responseBody.dependencies.database.max_connections).toEqual(100);
    });

    test("Retrieving Postgres Active Connections", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();

      expect(
        responseBody.dependencies.database.active_connections,
      ).toBeGreaterThan(0);
      expect(responseBody.dependencies.database.active_connections).toEqual(1);
    });
  });
});

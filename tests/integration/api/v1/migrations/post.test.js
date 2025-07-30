// tests/integration/api/v1/migrations/post.test.js
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("For the first time", () => {
      test("Running Pending Migrations", async () => {
        const firstResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const firstResponseBody = await firstResponse.json();
        expect(firstResponse.status).toBe(201);
        expect(Array.isArray(firstResponseBody)).toBe(true);
        expect(firstResponseBody.length).toBeGreaterThan(0);
      });
    });

    describe("For the second time", () => {
      test("Running Pending Migrations", async () => {
        const secondResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const secondResponseBody = await secondResponse.json();
        expect(secondResponse.status).toBe(200);
        expect(Array.isArray(secondResponseBody)).toBe(true);
        expect(secondResponseBody.length).toBe(0);
      });
    });
  });
});

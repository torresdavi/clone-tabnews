// tests/integration/api/v1/migrations/post.test.js
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

test("POST to api/v1/migrations should return status 200", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const secondResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  const firstResponseBody = await firstResponse.json();
  expect(firstResponse.status).toBe(201);
  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(firstResponseBody.length).toBeGreaterThan(0);

  const secondResponseBody = await secondResponse.json();
  expect(secondResponse.status).toBe(200);
  expect(Array.isArray(secondResponseBody)).toBe(true);
  expect(secondResponseBody.length).toBe(0);
});

test("PUT to api/v1/migrations should return status 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  expect(response.status).toBe(405);
});

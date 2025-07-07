// tests/integration/api/v1/status/get.test.js
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/statuss");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseBody);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("GET to /api/v1/status should return Postgres Version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.version).toEqual("16.0");
});

test("GET to /api/v1/status should return Postgres Max Connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});

test("GET to /api/v1/status should return Postgres Active Connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.active_connections).toBeGreaterThan(
    0,
  );
  expect(responseBody.dependencies.database.active_connections).toEqual(1);
});

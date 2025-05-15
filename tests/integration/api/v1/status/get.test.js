test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseBody);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("GET to /api/v1/status should return Postgres Version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.pg_version).toBeDefined();
  expect(responseBody.pg_version).toEqual(
    "PostgreSQL 16.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit",
  );
});

test("GET to /api/v1/status should return Postgres Max Connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.pg_max_connections).toBeDefined();
  expect(responseBody.pg_max_connections).toBeGreaterThan(0);
  expect(responseBody.pg_max_connections).toEqual(100);
});

test("GET to /api/v1/status should return Postgres Active Connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.pg_active_connections).toBeDefined();
  expect(responseBody.pg_active_connections).toBeGreaterThan(0);
});

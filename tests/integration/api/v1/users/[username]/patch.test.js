// tests/integration/api/v1/users/post.test.js
import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("Updating username and email", async () => {
      // Populating users db
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "firstUserName",
          email: "firstUserEmail@gmail.com",
          password: "123456",
        }),
      });

      expect(response1.status).toBe(201);

      // Retrieving user
      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/firstUserName",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "secondUserName",
            email: "secondUserEmail@gmail.com",
          }),
        },
      );

      const response2Body = await response2.json();

      expect(response2.status).toBe(200);
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "secondusername",
        email: "seconduseremail@gmail.com",
        password: "123456",
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
    });
  });
});

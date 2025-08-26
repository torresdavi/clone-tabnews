// tests/integration/api/v1/users/post.test.js
import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      // Populating users db
      await orchestrator.createUser({
        username: "CaseMatch",
        email: "CaseMatch@gmail.com",
        password: "123456",
      });

      // Retrieving user
      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/CaseMatch",
      );

      const response2Body = await response2.json();

      expect(response2.status).toBe(200);
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "CaseMatch",
        email: "casematch@gmail.com",
        password: response2Body.password,
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
    });

    test("With case mismatch", async () => {
      // Populating users db
      await orchestrator.createUser({
        username: "MisMatchUser",
        email: "userexists@gmail.com",
        password: "123456",
      });

      // Retrieving user
      const response = await fetch(
        "http://localhost:3000/api/v1/users/mismatchUser",
      );

      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O usuário não foi encontrado.",
        action: "Verifique se o username foi digitado corretamente.",
        status_code: 404,
      });
    });

    test("With nonexistent username", async () => {
      // Retrieving user
      const response = await fetch(
        "http://localhost:3000/api/v1/users/nonExistentUser",
      );

      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O usuário não foi encontrado.",
        action: "Verifique se o username foi digitado corretamente.",
        status_code: 404,
      });
    });
  });
});

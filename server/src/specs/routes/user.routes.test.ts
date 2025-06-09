import app from "../../server";
import request from "supertest";
import { preTestSetup } from "../../utils/pre-test";
import { faker } from "@faker-js/faker/.";

describe("User Routes", () => {
 

  it("should create a new user", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: faker.internet.email(),
      password: 'ValidPassword123@',
      passwordConfirmation: 'ValidPassword123@',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData)
      .expect(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user.firstName).toBe(userData.firstName);
    expect(response.body.user.lastName).toBe(userData.lastName);
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user).not.toHaveProperty("passwordConfirmation");
})
    });
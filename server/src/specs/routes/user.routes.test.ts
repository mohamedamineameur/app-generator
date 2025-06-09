import app from "../../server";
import request from "supertest";
import { preTestSetup } from "../../utils/pre-test";
import { faker } from "@faker-js/faker/.";
import { createUserFixture } from "../fixtures/user.fixture";

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
it ("should return 400 for missing required fields", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: faker.internet.email(),
      password: 'ValidPassword123@',
      passwordConfirmation: 'ValidPassword123@',
      firstName: faker.person.firstName(),
      // lastName is intentionally missing to trigger validation error
      // lastName: faker.person.lastName(),
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData)
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("LastName is required");
});

it ("should login a user", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const user = await createUserFixture()
    const userData = {
      email: user.email,
        password: user.password
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(200);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.message).toBe("Login successful.");
});

it ("should return 400 for missing required fields in login", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: faker.internet.email(),
      // password is intentionally missing to trigger validation error
      // password: 'ValidPassword123@',
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Password is required");   
}
);
it ("should return 401 for invalid credentials", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: faker.internet.email(),
      password: 'InvalidPassword123@',
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid email or password.");  
}
);
    

});
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
it("should return 400 for invalid email format", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: "invalid-email-format",
      password: 'ValidPassword123@',
      passwordConfirmation: 'ValidPassword123@',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData)
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid email format");
});
it("should return 400 for password mismatch", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: faker.internet.email(),
      password: 'ValidPassword123@',
      passwordConfirmation: 'DifferentPassword123@',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData)
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Passwords do not match");
});
it("should return 400 for weak password", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const userData = {
      email: faker.internet.email(),
      password: 'weak', // Weak password
      passwordConfirmation: 'weak',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),            
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData)
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Password must be at least 12 characters long, contain uppercase and lowercase letters, numbers, and special characters.");
});
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
it ("should return 401 for invalid credentials email", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const user=await createUserFixture();
    const userData = {
      email: faker.internet.email(),
      password: user.password
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid email or password.");  
}
);
it ("should return 401 for invalid credentials password", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const user=await createUserFixture();
    const userData = {
      email: user.email,
      password: faker.internet.password()
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid email or password.");  
}
);
it ("should get me after login with token wraped in cookie", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const user = await createUserFixture();
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200);
      const cookie = loginResponse.headers['set-cookie'][0];

      const response = await request(app)
      .get("/api/users/me")
      .set("Cookie", cookie)
      .expect(200);
    expect(response.body.user.id).toEqual(user.id)
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.firstName).toBe(user.firstName);
    expect(response.body.user.lastName).toBe(user.lastName);
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user).not.toHaveProperty("passwordConfirmation");     
    }
);
it("should delete user", async ()=>{
    //pretest
    await preTestSetup
    const user = await createUserFixture();
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200);
      const cookie = loginResponse.headers['set-cookie'][0];

      const response = await request(app)
      .delete("/api/users/delete")
      .send({
        password:user.password
      })
      .set("Cookie", cookie)
      .expect(200);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User deleted successfully.");
})
  it("should return 401 for unauthorized access to me endpoint", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const response = await request(app)
      .get("/api/users/me")
      .expect(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Unauthorized. No token provided.");
  });
 it("should not delete user without password", async () => {
    // Pre-test setup to clear the database and create a default role
    await preTestSetup();
    const user = await createUserFixture();
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200);
    const cookie = loginResponse.headers['set-cookie'][0];

    const response = await request(app)
      .delete("/api/users/delete")
      .send({})
      .set("Cookie", cookie)
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Password is required");
  }
  );
    

});
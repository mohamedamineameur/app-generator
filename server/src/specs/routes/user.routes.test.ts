
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  
  describe("User Routes", () => {
    
  it("should create a new user", async () => {
      await preTestSetup();

      const sudoUser = (await createUserFixture({ role: "sudo" }))
      const data = {
        
        username: faker.internet.username(),
        email: faker.internet.email(),
        role: "user",
        password: "StrongPassword1234@", 
        
      };
     
      
      const login = await request(app)
        .post("/api/users/login")
        .send({
          username: sudoUser.username,
          password: sudoUser.nonHashedPassword, 
        })
        .expect(200);        
        const cookie = login.headers["set-cookie"][0];
  
      const response = await request(app)
        .post("/api/users")
        .send(data)
        .set("Cookie", cookie) 
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all users", async () => {
      await preTestSetup();
      await createUserFixture();
      const sudoUser = (await createUserFixture({ role: "sudo" }))
      const login = await request(app)
        .post("/api/users/login")
        .send({
          username: sudoUser.username,
          password: sudoUser.nonHashedPassword, 
        })
        .expect(200);
      const cookie = login.headers["set-cookie"][0];
  
      const response = await request(app)
        .get("/api/users")
        .set("Cookie", cookie)
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get user by id", async () => {
      await preTestSetup();
      const user = await createUserFixture();
      const sudoUser = (await createUserFixture({ role: "sudo" }))
      const login = await request(app)
        .post("/api/users/login")
        .send({
          username: sudoUser.username,
          password: sudoUser.nonHashedPassword,
        })
        .expect(200);
      const cookie = login.headers["set-cookie"][0];
  
      const response = await request(app)
        .get("/api/users/" + user.id)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(user.id);
  });


  it("should update user", async () => {
      await preTestSetup();
      const user = await createUserFixture();
      const sudoUser = (await createUserFixture({ role: "sudo" }))
      const login = await request(app)
        .post("/api/users/login")
        .send({
          username: sudoUser.username,
          password: sudoUser.nonHashedPassword,
        })
        .expect(200);
      const cookie = login.headers["set-cookie"][0];
  
      
  
      const updateData = {
        id: user.id,
        username: faker.internet.username()
        
        
      };
  
      const response = await request(app)
        .patch("/api/users")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(user.id);
  });


  it("should delete user", async () => {
      await preTestSetup();
      const user = await createUserFixture();
      const sudoUser = (await createUserFixture({ role: "sudo" }))
      const login = await request(app)
        .post("/api/users/login")
        .send({
          username: sudoUser.username,  
          password: sudoUser.nonHashedPassword,
        })
        .expect(200);
      const cookie = login.headers["set-cookie"][0];
  
      const response = await request(app)
        .delete("/api/users/" + user.id)
        
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User deleted successfully");
  });
  });
  
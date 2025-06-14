
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  
  describe("User Routes", () => {
    
  it("should create a new user", async () => {
      await preTestSetup();
  
      
  
      const data = {
        
        // Ajoute ici d'autres champs si besoin
      };
  
      const response = await request(app)
        .post("/api/users")
        .send(data)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all users", async () => {
      await preTestSetup();
      await createUserFixture();
  
      const response = await request(app)
        .get("/api/users")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get user by id", async () => {
      await preTestSetup();
      const user = await createUserFixture();
  
      const response = await request(app)
        .get("/api/users/" + user.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(user.id);
  });


  it("should update user", async () => {
      await preTestSetup();
      const user = await createUserFixture();
  
      
  
      const updateData = {
        id: user.id,
        
        // Ajoute ici d'autres champs modifiés
      };
  
      const response = await request(app)
        .patch("/api/users")
        .send(updateData)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(user.id);
  });


  it("should delete user", async () => {
      await preTestSetup();
      const user = await createUserFixture();
  
      const response = await request(app)
        .delete("/api/users")
        .send({ id: user.id })
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User deleted successfully");
  });
  });
  
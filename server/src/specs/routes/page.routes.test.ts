
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createPageFixture } from "../fixtures/page.fixture";
  
  
  describe("Page Routes", () => {
    
  it("should create a new page", async () => {
      await preTestSetup();
  
      
  
      const data = {
        
        // Ajoute ici d'autres champs si besoin
      };
  
      const response = await request(app)
        .post("/api/pages")
        .send(data)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all pages", async () => {
      await preTestSetup();
      await createPageFixture();
  
      const response = await request(app)
        .get("/api/pages")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get page by id", async () => {
      await preTestSetup();
      const page = await createPageFixture();
  
      const response = await request(app)
        .get("/api/pages/" + page.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(page.id);
  });


  it("should update page", async () => {
      await preTestSetup();
      const page = await createPageFixture();
  
      
  
      const updateData = {
        id: page.id,
        
        // Ajoute ici d'autres champs modifiés
      };
  
      const response = await request(app)
        .patch("/api/pages")
        .send(updateData)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(page.id);
  });


  it("should delete page", async () => {
      await preTestSetup();
      const page = await createPageFixture();
  
      const response = await request(app)
        .delete("/api/pages/" + page.id)
        .send({ id: page.id })
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Page deleted successfully");
  });
  });
  
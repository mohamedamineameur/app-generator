
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createPageContentFixture } from "../fixtures/pageContent.fixture";
  import { createPageFixture } from "../fixtures/page.fixture";
import { createContentFixture } from "../fixtures/content.fixture";
import { createUserFixture } from "../fixtures/user.fixture";
  
  describe("PageContent Routes", () => {
    
  it("should create a new pageContent", async () => {
      await preTestSetup();
  
      const page = await createPageFixture();
    const content = await createContentFixture();
      const sudoUser = (await createUserFixture({ role: "sudo" }))
      const login = await request(app)
        .post("/api/users/login")
        .send({
          username: sudoUser.username,
          password: sudoUser.nonHashedPassword,
        })
        .expect(200);
      const cookie = login.headers["set-cookie"][0];
  
      const data = {
        pageId: page.id.toString(),
      contentId: content.id.toString(),
      orderNumber: 1,
      };
  
      const response = await request(app)
        .post("/api/pageContents")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("pageId");
  });


  it("should get all pageContents", async () => {
      await preTestSetup();
      await createPageContentFixture();
  
      const response = await request(app)
        .get("/api/pageContents")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get pageContent by id", async () => {
      await preTestSetup();
      const pageContent = await createPageContentFixture();
  
      const response = await request(app)
        .get("/api/pageContents/" + pageContent.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(pageContent.id);
  });


  it("should update pageContent", async () => {
      await preTestSetup();
      const pageContent = await createPageContentFixture();
  
      const page = await createPageFixture();
    const content = await createContentFixture();

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
        id: pageContent.id,
        pageId: page.id.toString(),
      contentId: content.id.toString(),
        orderNumber: 2,
      };
  
      const response = await request(app)
        .patch("/api/pageContents")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(pageContent.id);
  });


  it("should delete pageContent", async () => {
      await preTestSetup();
      const pageContent = await createPageContentFixture();
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
        .delete("/api/pageContents/" + pageContent.id)
        .send({ id: pageContent.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("PageContent deleted successfully");
  });
  });
  
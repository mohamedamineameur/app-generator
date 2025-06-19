
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createContentFixture } from "../fixtures/content.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  
  describe("Content Routes", () => {
    
  it("should create a new content", async () => {
      await preTestSetup();
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
        contentFr: faker.lorem.paragraph(),
        contentEn: faker.lorem.paragraph(),
      };
  
      const response = await request(app)
        .post("/api/contents")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all contents", async () => {
      await preTestSetup();
      await createContentFixture();
      await createContentFixture({ isPublished: false });
  
      const response = await request(app)
        .get("/api/contents")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });
  it("should get all contents if sudo", async () => {
      await preTestSetup();
      await createContentFixture();
      await createContentFixture({ isPublished: false });
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
        .get("/api/contents/manage")
        .set("Cookie", cookie)
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(2);
  });


  it("should get content by id", async () => {
      await preTestSetup();
      const content = await createContentFixture();
  
      const response = await request(app)
        .get("/api/contents/" + content.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(content.id);
  });

  it("should not get content by id if not published", async () => {
      await preTestSetup();
      const content = await createContentFixture({ isPublished: false });

      const response = await request(app)
        .get("/api/contents/" + content.id)
        .expect(403);
  })
  it("should get content by id if sudo", async () => {
      await preTestSetup();
      const content = await createContentFixture({ isPublished: false });
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
        .get("/api/contents/manage/" + content.id)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(content.id);
  });



  it("should update content", async () => {
      await preTestSetup();
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
        id: content.id,
        
        contentFr: faker.lorem.paragraph(),
        isPublished: true,
      };
  
      const response = await request(app)
        .patch("/api/contents")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(content.id);
  });


  it("should delete content", async () => {
      await preTestSetup();
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
  
      const response = await request(app)
        .delete("/api/contents/" + content.id)
        .send({ id: content.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Content deleted successfully");
  });
  });
  
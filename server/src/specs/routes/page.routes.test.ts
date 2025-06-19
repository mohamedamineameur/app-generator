
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createPageFixture } from "../fixtures/page.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  
  describe("Page Routes", () => {
    
  it("should create a new page", async () => {
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
        
        titleFr: faker.lorem.sentence(),
        titleEn: faker.lorem.sentence(),
        isPublished: faker.datatype.boolean(),
      };
  
      const response = await request(app)
        .post("/api/pages")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all pages", async () => {
      await preTestSetup();
      await createPageFixture();
      await createPageFixture({ isPublished: false });
  
      const response = await request(app)
        .get("/api/pages")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("titleFr");
      expect(response.body[0]).toHaveProperty("titleEn");
      expect(response.body[0]).toHaveProperty("isPublished");
      expect(response.body[0].isPublished).toBe(true);

  });
  it("should get all pages if sudo", async () => {
    await preTestSetup();
    await createPageFixture();
    await createPageFixture({ isPublished: false });
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
      .get("/api/pages/manage")
      .set("Cookie", cookie)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toEqual(2);
    

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
  it("should get page by id if sudo", async () => {
    await preTestSetup();
    const page = await createPageFixture({ isPublished: false });
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
      .get("/api/pages/manage/" + page.id)
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(page.id);
});
  it("should not get page by id if not published", async () => {
      await preTestSetup();
      const page = await createPageFixture({ isPublished: false });
  
      const response = await request(app)
        .get("/api/pages/" + page.id)
        .expect(403);
  
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Page is not published");
  });


  it("should update page", async () => {
      await preTestSetup();
      const page = await createPageFixture();
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
        id: page.id,
        
        titleFr: faker.lorem.sentence(),
        isPublished: faker.datatype.boolean(),
      };
  
      const response = await request(app)
        .patch("/api/pages")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(page.id);
  });


  it("should delete page", async () => {
      await preTestSetup();
      const page = await createPageFixture();
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
        .delete("/api/pages/" + page.id)
        .send({ id: page.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Page deleted successfully");
  });
  });
  
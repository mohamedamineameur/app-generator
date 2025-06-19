
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createBlogFixture } from "../fixtures/blog.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  
  describe("Blog Routes", () => {
    
  it("should create a new blog", async () => {
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
        
        title: faker.lorem.sentence(),
        isPublished: faker.datatype.boolean(),
      };
  
      const response = await request(app)
        .post("/api/blogs")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all blogs", async () => {
      await preTestSetup();
      await createBlogFixture();
      await createBlogFixture({ isPublished: false });

  
      const response = await request(app)
        .get("/api/blogs")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(1); 
  });


  it("should get blog by id", async () => {
      await preTestSetup();
      const blog = await createBlogFixture();
  
      const response = await request(app)
        .get("/api/blogs/" + blog.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(blog.id);
  });
  it("should not get blog by id", async () => {
    await preTestSetup();
    const blog = await createBlogFixture({ isPublished: false});

    const response = await request(app)
      .get("/api/blogs/" + blog.id)
      .expect(403);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Blog is not published");
});


  it("should update blog", async () => {
      await preTestSetup();
      const blog = await createBlogFixture();
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
        id: blog.id,
        
        title: faker.lorem.sentence(),
        isPublished: faker.datatype.boolean(),
      };
  
      const response = await request(app)
        .patch("/api/blogs")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(blog.id);
  });


  it("should delete blog", async () => {
      await preTestSetup();
      const blog = await createBlogFixture();
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
        .delete("/api/blogs/" + blog.id)
        .send({ id: blog.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Blog deleted successfully");
  });
  });
  
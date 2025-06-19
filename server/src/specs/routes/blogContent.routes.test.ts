
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createBlogContentFixture } from "../fixtures/blogContent.fixture";
  import { createBlogFixture } from "../fixtures/blog.fixture";
import { createContentFixture } from "../fixtures/content.fixture";
import { createUserFixture } from "../fixtures/user.fixture";
  
  describe("BlogContent Routes", () => {
    
  it("should create a new blogContent", async () => {
      await preTestSetup();
  
      const blog = await createBlogFixture();
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
        blogId: blog.id.toString(),
      contentId: content.id.toString(),
        orderNumber: 1, 
      };
  
      const response = await request(app)
        .post("/api/blogContents")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("blogId");
  });


  it("should get all blogContents", async () => {
      await preTestSetup();
      await createBlogContentFixture();
  
      const response = await request(app)
        .get("/api/blogContents")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get blogContent by id", async () => {
      await preTestSetup();
      const blogContent = await createBlogContentFixture();
  
      const response = await request(app)
        .get("/api/blogContents/" + blogContent.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(blogContent.id);
  });


  it("should update blogContent", async () => {
      await preTestSetup();
      const blogContent = await createBlogContentFixture();
  
      const blog = await createBlogFixture();
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
        id: blogContent.id,
        blogId: blog.id.toString(),
      contentId: content.id.toString(),
        orderNumber: 2,
      };
  
      const response = await request(app)
        .patch("/api/blogContents")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(blogContent.id);
  });


  it("should delete blogContent", async () => {
      await preTestSetup();
      const blogContent = await createBlogContentFixture();
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
        .delete("/api/blogContents/" + blogContent.id)
        .send({ id: blogContent.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("BlogContent deleted successfully");
  });
  });
  
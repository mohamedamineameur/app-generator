
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createBlogMiniatureFixture } from "../fixtures/blogMiniature.fixture";
  import { createBlogFixture } from "../fixtures/blog.fixture";
import { createPictureFixture } from "../fixtures/picture.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  describe("BlogMiniature Routes", () => {
    
  it("should create a new blogMiniature", async () => {
      await preTestSetup();
  
      const blog = await createBlogFixture();
    const picture = await createPictureFixture();
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
      pictureId: picture.id.toString(),
        // Ajoute ici d'autres champs si besoin
      };
  
      const response = await request(app)
        .post("/api/blogMiniatures")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("blogId");
  });


  it("should get all blogMiniatures", async () => {
      await preTestSetup();
      await createBlogMiniatureFixture();
  
      const response = await request(app)
        .get("/api/blogMiniatures")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get blogMiniature by id", async () => {
      await preTestSetup();
      const blogMiniature = await createBlogMiniatureFixture();
  
      const response = await request(app)
        .get("/api/blogMiniatures/" + blogMiniature.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(blogMiniature.id);
  });


  it("should update blogMiniature", async () => {
      await preTestSetup();
      const blogMiniature = await createBlogMiniatureFixture();

  
      const blog = await createBlogFixture();
    const picture = await createPictureFixture();
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
        id: blogMiniature.id,
        blogId: blog.id.toString(),
      pictureId: picture.id.toString(),
        // Ajoute ici d'autres champs modifiés
      };
  
      const response = await request(app)
        .patch("/api/blogMiniatures")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(blogMiniature.id);
  });


  it("should delete blogMiniature", async () => {
      await preTestSetup();
      const blogMiniature = await createBlogMiniatureFixture();
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
        .delete("/api/blogMiniatures/" + blogMiniature.id)
        .send({ id: blogMiniature.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("BlogMiniature deleted successfully");
  });
  });
  
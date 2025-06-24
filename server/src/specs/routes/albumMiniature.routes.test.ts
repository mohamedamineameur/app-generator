
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createAlbumMiniatureFixture } from "../fixtures/albumMiniature.fixture";
  import { createAlbumFixture } from "../fixtures/album.fixture";
import { createPictureFixture } from "../fixtures/picture.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  describe("AlbumMiniature Routes", () => {
    
  it("should create a new albumMiniature", async () => {
      await preTestSetup();
  
      const album = await createAlbumFixture();
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
        albumId: album.id.toString(),
      pictureId: picture.id.toString(),
      };
  
      const response = await request(app)
        .post("/api/albumMiniatures")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("albumId");
  });


  it("should get all albumMiniatures", async () => {
      await preTestSetup();
      await createAlbumMiniatureFixture();
  
      const response = await request(app)
        .get("/api/albumMiniatures")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });


  it("should get albumMiniature by id", async () => {
      await preTestSetup();
      const albumMiniature = await createAlbumMiniatureFixture();
  
      const response = await request(app)
        .get("/api/albumMiniatures/" + albumMiniature.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(albumMiniature.id);
  });


  it("should update albumMiniature", async () => {
      await preTestSetup();
      const albumMiniature = await createAlbumMiniatureFixture();
  
      const album = await createAlbumFixture();
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
        id: albumMiniature.id,
        albumId: album.id.toString(),
      pictureId: picture.id.toString(),
        
      };
  
      const response = await request(app)
        .patch("/api/albumMiniatures")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(albumMiniature.id);
  });


  it("should delete albumMiniature", async () => {
      await preTestSetup();
      const albumMiniature = await createAlbumMiniatureFixture();
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
        .delete("/api/albumMiniatures/" + albumMiniature.id)
        .send({ id: albumMiniature.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("AlbumMiniature deleted successfully");
  });
  });
  
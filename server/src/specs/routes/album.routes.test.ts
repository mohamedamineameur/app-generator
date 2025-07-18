
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { createAlbumFixture } from "../fixtures/album.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  
  describe("Album Routes", () => {
    
  it("should create a new album", async () => {
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
        isPublished: false, 
      };
  
      const response = await request(app)
        .post("/api/albums")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      
  });


  it("should get all albums", async () => {
      await preTestSetup();
      await createAlbumFixture();
      await createAlbumFixture({ isPublished: false });
  
      const response = await request(app)
        .get("/api/albums")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(1);
  });
  it("should get all published albums if manager", async () => {
      await preTestSetup();
      await createAlbumFixture({ isPublished: true });
      await createAlbumFixture({ isPublished: false });
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
        .get("/api/albums/manage")
        .set("Cookie", cookie)
        console.log(response.body);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(2);
  }
  );


  it("should get album by id", async () => {
      await preTestSetup();
      const album = await createAlbumFixture();
  
      const response = await request(app)
        .get("/api/albums/" + album.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(album.id);
  });
  it("should get album by id if sudo", async () => {
    await preTestSetup();
    const album = await createAlbumFixture({ isPublished: false });
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
      .get("/api/albums/manage/" + album.id)
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(album.id);
});


  it("should update album", async () => {
      await preTestSetup();
      const album = await createAlbumFixture();
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
        id: album.id,
        
        titleFr: faker.lorem.sentence(),
        isPublished: true,
      };
  
      const response = await request(app)
        .patch("/api/albums")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(album.id);
  });


  it("should delete album", async () => {
      await preTestSetup();
      const album = await createAlbumFixture();
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
        .delete("/api/albums/"+ album.id)
        .send({ id: album.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Album deleted successfully");
  });
  });
  
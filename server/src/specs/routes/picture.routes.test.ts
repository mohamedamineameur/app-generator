
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import {faker } from "@faker-js/faker";
  import { createPictureFixture } from "../fixtures/picture.fixture";
  import { createAlbumFixture } from "../fixtures/album.fixture";
  import { createUserFixture } from "../fixtures/user.fixture";
  
  describe("Picture Routes", () => {
    
  it("should create a new picture", async () => {
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
  
      const album = await createAlbumFixture();
  
      const data = {
        albumId: album.id.toString(),
        description: faker.lorem.sentence(),        
        
      };
  
      const response = await request(app)
        .post("/api/pictures")
        .send(data)
        .set("Cookie", cookie)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("albumId");
  });


  it("should get all pictures", async () => {
      await preTestSetup();
      await createPictureFixture({isPublished: true});
      await createPictureFixture({isPublished: false});
      const album = await createAlbumFixture({isPublished: false});
      await createPictureFixture({albumId: album.id.toString(), isPublished: true});
  
      const response = await request(app)
        .get("/api/pictures")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(1); 
  });


  it("should get picture by id", async () => {
      await preTestSetup();
      const picture = await createPictureFixture({isPublished: true});
  
      const response = await request(app)
        .get("/api/pictures/" + picture.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(picture.id);
  });
  it("should not get picture by id if not publisher", async () => {
    await preTestSetup();
    const picture = await createPictureFixture({isPublished: false});

    const response = await request(app)
      .get("/api/pictures/" + picture.id)
      .expect(403);

    expect(response.body).not.toHaveProperty("id");
});


it("should get all pictures for management", async () => {
    await preTestSetup();
    await createPictureFixture({isPublished: true});
    await createPictureFixture({isPublished: false});
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
      .get("/api/pictures/manage")
      .set("Cookie", cookie)
      .expect(200);
    expect(response.body).toHaveProperty("length");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toEqual(2);
  });

  


  it("should update picture", async () => {
      await preTestSetup();
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
  
      const album = await createAlbumFixture();
  
      const updateData = {
        id: picture.id,
        albumId: album.id.toString(),
        description: faker.lorem.sentence(),
        isPublished: true,
      };
  
      const response = await request(app)
        .patch("/api/pictures")
        .send(updateData)
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(picture.id);
  });


  it("should delete picture", async () => {
      await preTestSetup();
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
  
      const response = await request(app)
        .delete("/api/pictures/" + picture.id)
        .send({ id: picture.id })
        .set("Cookie", cookie)
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Picture deleted successfully");
  });
  });
  
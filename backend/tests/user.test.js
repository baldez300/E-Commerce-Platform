const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);

let token = null;

describe("User API tests", () => {
  test("User can be created with all the fields filled in", async () => {
    const res = await api
      .post("/api/user/register")
      .send({
        email: "user31@example.com",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        address: {
          street: "Main St",
          number: "123",
          postalCode: "12345",
          city: "City",
          country: "Country"
        }
      })
      .expect(201);
  });
  test("User cannot be created with invalid fields", async () => {
    const res = await api
      .post("/api/user/register")
      .send({
        email: "user31@example.com",
        password: "password",
      })
      .expect(400);
  });
  test("User can login with valid credentials", async () => {
    const res = await api
      .post("/api/user/login")
      .send({
        email: "user24@example.com",
        password: "password",
      })
      .expect(200);
    token = res.body.refreshToken;
    console.log(token);
  });
  test("User can get his/her own information with a valid token", async () => {
    const res = await api
      .post("/api/user/token")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty("savedUser._id");
    //console.log(res.body);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
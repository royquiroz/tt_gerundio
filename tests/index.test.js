const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../src/models/userModel");
const { app, server } = require("../src/server");

const { fakeData, getAllUsers } = require("./helpers");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  await User.insertMany(fakeData);
});

describe("Get all users", () => {
  test("Users return in json", async () => {
    await api
      .get("/user")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("There are 25 users", async () => {
    const response = await api.get("/user");

    expect(response.body).toHaveLength(fakeData.length);
  });

  test("There is a user with the email 'jbrotherwood8@barnesandnoble.com'", async () => {
    const response = await api.get("/user");

    const emails = response.body.map((user) => user.email);
    expect(emails).toContain("jbrotherwood8@barnesandnoble.com");
  });
});

describe("Get a user", () => {
  test("Validate name user 'hmelpusse@wikispaces.com'", async () => {
    const response = await api.get("/user/hmelpusse@wikispaces.com");

    expect(response.body.first_name).toBe("Homerus");
    expect(response.body.age).not.toBeLessThan(18);
  });
});

describe("Create new user", () => {
  test("Create new user", async () => {
    const newUser = {
      first_name: "Gonzalo",
      last_name: "Quiroz",
      email: "gonzalo_quiroz@mail.com",
      username: "Gonzalo1990",
      age: 33,
    };

    await api
      .post("/user")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await getAllUsers();

    expect(response.body).toHaveLength(fakeData.length + 1);
  });
});

describe("Update user", () => {
  test("Update info user", async () => {
    const updateUser = {
      first_name: "Rodrigo",
      username: "Roy90",
      age: 30,
      gender: "Male",
    };

    await api
      .put("/user/cgaltone0@cnet.com")
      .send(updateUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Delete user", () => {
  test("Delete first user in db for id", async () => {
    const allUsers = await getAllUsers();
    const user = allUsers.body[0];

    await api
      .delete(`/user/${user._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await getAllUsers();

    expect(response.body).toHaveLength(fakeData.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

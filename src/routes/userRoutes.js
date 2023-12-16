const router = require("express").Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

router.get("/", async (req, res) => {
  try {
    const user = await getAllUsers();
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:value", async (req, res) => {
  try {
    const { params } = req;

    const user = await getUser(params.value);
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;

    const user = await createUser(body);
    res.send({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:value", async (req, res) => {
  try {
    const { body, params } = req;

    const user = await updateUser(params.value, body);
    res.send({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { params } = req;

    await deleteUser(params.id);
    res.send({ message: `User with id "${params.id}" remove` });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

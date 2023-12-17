const router = require("express").Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

/**
 * Get all the users created in the user database
 */
router.get("/", async (req, res) => {
  try {
    const user = await getAllUsers();
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get a user in the database either by id or email
 */
router.get("/:value", async (req, res) => {
  try {
    const { params } = req;

    const user = await getUser(params.value);
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create new user
 */
router.post("/", async (req, res) => {
  try {
    const { body } = req;

    const user = await createUser(body);
    res.send({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Edit a previously created user
 */
router.put("/:value", async (req, res) => {
  try {
    const { body, params } = req;

    const user = await updateUser(params.value, body);
    res.send({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete user by id
 */
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

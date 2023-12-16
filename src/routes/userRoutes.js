import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUser();
    res.send({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const user = await createUser(body);
    res.send({ user });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
});

router.put("/", async (req, res) => {
  try {
    const { body } = req;
    const user = await updateUser(body);
    res.send({ user });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { body } = req;
    const user = await deleteUser(body);
    res.send({ user });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
});

// router.post("/auth", async (req, res) => {
//   try {
//     const { body } = req;
//     const user = await getUserByEmail(body);

//     if (user.length <= 0) return res.send("This user does not exist in the db");

//     if (!compareSync(body.password, user[0].password))
//       return res.send("La contraseña es incorrecta");

//     return res.send({ user });
//   } catch (error) {
//     console.log({ error });
//     res.status(500).send({ error });
//   }
// });

// router.post("/register", async (req, res) => {
//   try {
//     const { body } = req;

//     const salt = genSaltSync(256);
//     const hashedPassword = hashSync(body.password, salt);
//     body.password = hashedPassword;

//     const user = await createUser(body);
//     return res.send({ user });
//   } catch (error) {
//     console.log({ error });
//     res.status(500).send({ error });
//   }
// });

export default router;

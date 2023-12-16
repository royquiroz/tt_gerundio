const Moongose = require("mongoose");
const UserModel = require("../models/userModel");

const getAllUsers = async () => {
  try {
    const users = await UserModel.find();

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async (value) => {
  try {
    let user;

    if (Moongose.isValidObjectId(value)) {
      user = await UserModel.findById(value);
    }

    if (!user) {
      user = await UserModel.findOne({ email: value });
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (userData) => {
  try {
    const user = await UserModel.create(userData);

    return user;
  } catch (error) {
    if (error.code === 11000)
      throw new Error(
        `User with email exists in db ${JSON.stringify(error.keyValue)}`
      );

    throw new Error(error.message);
  }
};

const updateUser = async (value, body) => {
  const user = await getUser(value);

  try {
    await user.updateOne(body);

    return { ...user.toJSON(), ...body };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const { deletedCount } = await UserModel.deleteOne({ _id: id });

    if (deletedCount === 0) throw new Error(`User with id "${id}" not found`);

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

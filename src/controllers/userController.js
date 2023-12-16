import { isValidObjectId } from "mongoose";

import User from "../models/userModel";

export async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(value) {
  try {
    let user;

    if (isValidObjectId(value)) {
      user = await User.findById(value);
    }

    if (!user) {
      user = await User.findOne({ email: value });
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createUser(userData) {
  try {
    const user = await User.create(userData);

    return user;
  } catch (error) {
    if (error.code === 11000)
      throw new Error(
        `User with email exists in db ${JSON.stringify(error.keyValue)}`
      );

    throw new Error(error.message);
  }
}

export async function updateUser(value, body) {
  const user = await getUser(value);

  try {
    await user.updateOne(body);

    return { ...user.toJSON(), ...body };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id) {
  try {
    const { deletedCount } = await User.deleteOne({ _id: id });

    if (deletedCount === 0) throw new Error(`User with id "${id}" not found`);

    return;
  } catch (error) {
    throw new Error(error.message);
  }
}

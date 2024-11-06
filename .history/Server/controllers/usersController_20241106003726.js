import User from "../models/usersModel.js";
import dotenv from "dotenv";
import { auth } from "../auth/auth.js";
dotenv.config();

//  get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

//   add user
const addUser = async (req, res) => {
  try {
    const hashedPassword = await auth.makeHashedPassword(
      req.body.password,
      process.env.ENCYPTION_SECRET,
      process.env.SALT_NUM
    );
    console.log();

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      country: req.body.country,
      Phone: req.body.phone,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    const id = savedUser._id;
    res.send({
      message: "seve this id to delete or update the user latter on",
      id,
    });
  } catch (error) {
    // check if it mongoose error
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error occurred.",
        error: error.message,
      });
    } else if (error.code === 11000) {
      return res.status(409).send({
        message: "Duplicate key error. This user already exists.",
        error: error.message,
      });
    } else {
      console.error(error);
      return res.status(500).send({ error });
    }
  }
};

// get user by id
async function getUsereById(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ massege: "id not found" });
    }
    res.send({ user });
  } catch (error) {
    return res.status(500).json({ massege: error.massege });
  }
  res.user = user;
  next();
}

// get random users by num of users
const getRandomeUsers = async (req, res) => {
  try {
    let num = req.params.num || 1;

    if (isNaN(num) || num < 1) {
      num = 1;
    }

    const randomUsers = await User.aggregate([
      { $sample: { size: parseInt(num) } },
    ]);

    randomUsers.forEach((object) => delete object.password);

    res.send(randomUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

//   update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const filedsToUpdate = {};

    if (name || name !== "") {
      filedsToUpdate.name = name;
    }

    if (email || email !== "") {
      filedsToUpdate.email = email;
    }

    if (password || password !== "") {
      filedsToUpdate.password = password;
    }

    await User.findByIdAndUpdate(id, filedsToUpdate, {
      runValidators: true,
    });
    res.send({ message: "updated successfully" });
  } catch (err) {
    res.send({ error: `${err}` });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "user not found" });
    }

    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const userController = {
  getAllUsers,
  addUser,
  getUsereById,
  getRandomeUsers,
  updateUser,
  deleteUser,
};

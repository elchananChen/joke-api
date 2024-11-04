import express from "express";
import { userController } from "../controllers/usersController.js";
const router = express.Router();

//  get all users
router.get("/all", userController.getAllUsers);

// add user
router.post("/", userController.addUser);

// get user by id
router.get("/:id", userController.getUsereById, (req, res) => {
  res.json(res.joke);
});

// get random users by num of users
router.get("/random/:num", userController.getRandomeUsers);

// updete user by id
router.patch("/:id", userController.updateUser);

// delete user by id
router.delete("/:id", userController.deleteUser);
export default router;

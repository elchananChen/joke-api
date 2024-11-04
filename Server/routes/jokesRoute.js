import express from "express";
import { validateJoke } from "../middlewares/validator.js";
import { jokeController } from "../controllers/jokeController.js";

const router = express.Router();

//  get all jokes
router.get("/all", jokeController.getAllJokes);

// get random jokes  by num of jokes
router.get("/random/:num", jokeController.getRandomeJokes);

// get joke by id
router.get("/:id", jokeController.getJokeById, (req, res) => {
  res.json(res.joke);
});

//add joke
router.post("/", jokeController.addJoke);

// update joke
router.patch("/:id", validateJoke, jokeController.updateJoke);

//delete joke
router.delete("/:id", jokeController.deleteJoke);

export default router;

import Joke from "../models/jokeModel.js";

//  get all jokes
const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.find({});
    res.json(jokes);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get random jokes  by num of jokes
const getRandomeJokes = async (req, res) => {
  // מחזיר תת מסמך בצורה רנדומלית ע׳׳י ״שאילתת״ מונגו  - הסייז קובע כמה יחזרו אם אין מספר יחזור  1
  // ואם המספר גבוה ממספר הבדיחות - יחזרו כל הבדיחות (התנהגות של ״סמפל״)
  try {
    let num = req.params.num || 1;

    if (isNaN(num) || num < 1) {
      num = 1;
    }

    const randomJokes = await Joke.aggregate([
      { $sample: { size: parseInt(num) } },
    ]);

    res.send(randomJokes);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get joke by id
async function getJokeById(req, res, next) {
  let joke;
  try {
    joke = await Joke.findById(req.params.id);
    if (joke === null) {
      return res.status(404).json({ massege: "id not found" });
    }
    res.send({ joke });
  } catch (error) {
    return res.status(500).json({ massege: error.massege });
  }
  res.joke = joke;
  next();
}

//   add joke
const addJoke = async (req, res) => {
  try {
    const newJoke = new Joke({
      category: req.body.category,
      content: req.body.content,
      creatadBy: req.body.creatadBy,
    });
    const savedJoke = await newJoke.save();
    const id = savedJoke._id;
    res.send({
      message: "seve this id to delete or update your joke latter on",
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
        message: "Duplicate key error. The product already exists.",
        error: error.message,
      });
    } else {
      console.error(error);
      return res.status(500).send({
        message: "An error occurred while adding the product.",
        error: error.message,
      });
    }
  }
};

//   update joke
const updateJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const { joke, content } = req.body;
    const filedsToUpdate = {};

    if (joke || joke !== "") {
      filedsToUpdate.joke = joke;
    }

    if (content || content !== "") {
      filedsToUpdate.content = content;
    }

    await Joke.findByIdAndUpdate(id, filedsToUpdate, {
      runValidators: true,
    });
    res.send({ message: "updated successfully" });
  } catch (err) {
    res.send({ error: `${err}` });
  }
};

// delete joke
const deleteJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJoke = await Joke.findByIdAndDelete(id);

    if (!deletedJoke) {
      return res.status(404).send({ message: "Joke not found" });
    }

    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const jokeController = {
  getAllJokes,
  getRandomeJokes,
  getJokeById,
  addJoke,
  updateJoke,
  deleteJoke,
};

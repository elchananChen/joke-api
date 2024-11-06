import mongoose, { set } from "mongoose";

const isTwoStepsJoke = (input) => {
  if (this.category === 'Knock-Knock Jokes') {
    required : true
  }
}

const jokeSchema = new mongoose.Schema({

  content: {
    type: String,
    validate: {
    } 
  },
  setUp: {
    type: String,
    validate: {
      validator: isTwoStepsJoke()
    }
  },
  punchline: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['Knock-Knock Jokes', 'Puns', 'One-liners', 'Dad Jokes', 'Dark Humor', 'Jews Jokes']
  },
  creatadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Joke", jokeSchema);

import mongoose, { set } from "mongoose";

// const isTwoStepsJoke = 


const jokeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Knock-Knock Jokes",
      "Puns",
      "One-liners",
      "Dad Jokes",
      "Dark Humor",
      "Jews Jokes",
    ],
  },
  content: {
    type: String,
    validate: {},
  },
  setUp: {
    type: String,
    validate: {
      validator: function(input){
        if (this.category === "Knock-Knock Jokes") {
          input.required
        }
    },
  },
  punchline: {
    type: String,
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
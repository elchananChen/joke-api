const ROUTE = "http://localhost:3000/api/joke";

// get all jokes
// TODO ERROR HENDELING
// WORK
const getAllJokes = async () => {
  try {
    const response = await axios.get(`${ROUTE}/all`);
    console.log(response.data); // נתונים שמתקבלים
    return response.data;
  } catch (error) {
    console.log(error); // הדפסת שגיאה
    return { error: error.message };
  }
};

//get random jokes
// TODO ERROR HENDELING
// WORK
const getRandomsJokes = async (num) => {
  try {
    const response = await axios.get(`${ROUTE}/random/${num}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

// get joke by id
// TODO ERROR HENDELING
// WORK
const getJokeById = async (jokeId) => {
  try {
    const response = await axios.get(`${ROUTE}/${jokeId}`);
    return response.data.joke;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

// TODO ERROR HENDELING
// WORK
const addJokeByUserId = async (joke, content, userId) => {
  try {
    const response = await axios.post(`${ROUTE}`, {
      joke,
      content,
      creatadBy: userId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

// update joke
const updateJoke = async (jokeId, jokeChange, contentChange) => {
  try {
    const response = await axios.patch(`${ROUTE}/${jokeId}`, {
      joke: jokeChange,
      content: contentChange,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
updateJoke("6729bd30b9d5d8d8e1215925", "from client", "doubel yey");

// delete joke
const deleteJoke = async (jokeId) => {
  try {
    const response = await axios.delete(`${ROUTE}/${jokeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const jokesController = {
  getAllJokes,
  getRandomsJokes,
  getJokeById,
  addJokeByUserId,
  updateJoke,
  deleteJoke,
};

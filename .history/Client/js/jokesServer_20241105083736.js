const ROUTE = "http://localhost:3000/api/joke";

// get all jokes
// TODO ERROR HENDELING
// WORK - RETURN DATA IN ARRAY
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
// WORK - RETURN DATA IN ARRAY
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
// WORK - RETURN DATA IN ARRAY
const getJokeById = async (jokeId) => {
  try {
    const response = await axios.get(`${ROUTE}/${jokeId}`);
    return response.data.joke;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

// add joke
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
addJokeByUserId("from claient", "yey", "6729042889051d9c191dc1e5");

// update joke
const updateJoke = async (jokeId, jokeChange, contentChange) => {
  try {
    const response = await axios.patch(`${ROUTE}/${jokeId}`, {
      jokeChange,
      contentChange,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

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

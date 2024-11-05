const ROUTE = "http://localhost:3000/api/joke";

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

const getJokeById = async (jokeId) => {
  try {
    const response = await axios.get(`${ROUTE}/${jokeId}`);
    console.log(response.data.joke);
    return response.data.joke;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
getJokeById("6729063389051d9c191dc1f0");

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

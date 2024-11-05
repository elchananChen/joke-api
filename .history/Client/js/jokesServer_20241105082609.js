const ROUTE = "http://localhost:3000/api/joke";

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

const getRandomsJoke = async (num) => {
  try {
    const response = await axios.get(`${ROUTE}/random/${num}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

console.log(getRandomsJoke(5));

const getJokeById = async (jokeId) => {
  try {
    const response = await axios.get(`${ROUTE}/${jokeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

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
  getRandomsJoke,
  getJokeById,
  addJokeByUserId,
  updateJoke,
  deleteJoke,
};
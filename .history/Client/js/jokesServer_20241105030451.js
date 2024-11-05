const ROUTE = "http://localhost:3000/api/joke";
const getAllJokes = async () => {
  try {
    const response = await axios.get(`${ROUTE}/all`);
    console.log(response.data); // נתונים שמתקבלים
    return response.data;
  } catch (err) {
    console.log(err); // הדפסת שגיאה
  }
};

const getRandomsJoke = async (num) => {
  try {
    const response = await axios.get(`${ROUTE}/random/${num}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getJokeById = async (jokeId) => {
  try {
    const response = await axios.get(`${ROUTE}/${jokeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log({ error: error.message });
  }
};

export const jokesController = {
  getAllJokes,
  getRandomsJoke,
  getJokeById,
  addJokeByUserId,
};

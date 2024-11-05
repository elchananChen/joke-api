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
    const response = await axios.get(`http://localhost:3000/api/joke/random/3`);
  } catch (error) {}
};

export const jokesController = {
  getAllJokes,
};

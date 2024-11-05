const getAllJokes = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/joke/all`);
    console.log(response.data); // נתונים שמתקבלים
    return response.data;
  } catch (err) {
    console.log(err); // הדפסת שגיאה
  }
};

export const jokes = {
  getAllJokes,
};

const allJOkesEL = document.querySelector(".all-jokes");
const getAllJokes = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/user/all`);
    console.log(response.data); // נתונים שמתקבלים
    return response.data;
  } catch (err) {
    console.log(err); // הדפסת שגיאה
  }
};
getAllJokes();

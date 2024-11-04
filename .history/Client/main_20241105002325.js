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

console.log(getAllJokes());
async function randerAllJokes() {
  const jokes = await getAllJokes();
  jokes.forEach((joke) => {
    const liEL = document.createElement("li");
    liEL.textContent = `${joke.name} `;
    allJOkesEL.appendChild(liEL);
  });
}
randerAllJokes();

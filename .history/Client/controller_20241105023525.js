import { jokes } from "./js/jokesServer.js";

const allJokesEL = document.querySelector(".all-jokes");

console.log(getAllJokes());
async function randerAllJokes() {
  const jokes = await getAllJokes();
  jokes.forEach((joke) => {
    const liEL = document.createElement("li");
    liEL.textContent = ` ${joke.joke} :  ${joke.content}`;
    allJokesEL.appendChild(liEL);
  });
}
randerAllJokes();

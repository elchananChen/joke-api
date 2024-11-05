import { jokes } from "./js/jokesServer.js";

const allJokesEL = document.querySelector(".all-jokes");

async function randerAllJokes() {
  const jokes = await jokes.getAllJokes();
  jokes.forEach((joke) => {
    const liEL = document.createElement("li");
    liEL.textContent = ` ${joke.joke} :  ${joke.content}`;
    allJokesEL.appendChild(liEL);
  });
}
randerAllJokes();

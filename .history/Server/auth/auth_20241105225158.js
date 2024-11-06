import bcrypt from "bcrypt";
import dotenv from "dotenv";

// todo: elchanan - sign up functiond

dotenv.config();

const makeHashedPassword = async (password, superSecretKey, saltNum) => {
  try {
    const combainKey = password + superSecretKey;
    const hashedPassword = await bcrypt.hash(combainKey, saltNum);
    console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log(`server error: ${error}`);
    e;
  }
};

// const signUp = (password, hashedPassword) => {
//   try {
//   } catch (error) {}
// };

// todo: nathan - sign in function - take the "hashed password" and the "req.body.password" and compare them useing bcrypt.compere.

// async function signIn(password, mongoPassword) {
//   const combinedPassword = password + process.env.ENCYPTION_SECRET;
//   console.log(combinedPassword);
// }
// signIn(1344, 43231);

export const auth = {
  makeHashedPassword,
};

import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// DONE
const makeHashedPassword = async (password, superSecretKey, saltNum) => {
  try {
    const combainKey = password + superSecretKey;
    const hashedPassword = await bcrypt.hash(combainKey, Number(saltNum));
    console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log(`server error: ${error}`);
  }
};

// todo: nathan - sign in function - take the "hashed password" and the "req.body.password" and compare them useing bcrypt.compere.

//login function to compare the input Password with stored hashed password
const signIn = async (inputPassword, storedHashedPassword) => {
  try {
    //combine the input password with our secret key
    const combinedPassword = inputPassword + process.env.BCRYPT_KEY;

    //check if the combination of the two matches our stored password
    const isMatch = await bcrypt.compare(
      combinedPassword,
      storedHashedPassword
    );

    if (!isMatch) {
      return { success: false, message: "Wrong password or email" };
    }
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.log(`server error: ${error}`);
    return false;
  }
};

export const auth = {
  makeHashedPassword,
  signIn,
};

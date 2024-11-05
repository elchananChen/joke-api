const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).send({ message: "User not found!" });
    }
    const isAuth = await comparePassword(password, foundUser.password);
    if (!isAuth) {
      return res.status(401).send({ message: "Invalid password!" });
    }
    res.status(200).send({
      message: "User logged in successfully!",
      message: isAuth,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
};
const comparePassword = async (userPassword, dbHash) => {
  const combinedPassword = userPassword + secretKey;
  return await bcrypt.compare(combinedPassword, dbHash);
};

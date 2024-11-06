import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jokesRoute from "./routes/jokesRoute.js";
import usersRoute from "./routes/usersRoute.js";
import prductRoute from "./routes/productsRoute.js";
import cors from "cors";
import { auth } from "./auth/auth.js";
dotenv.config();

mongoose.connect(process.env.URI).then(() => {
  console.log("connected");
});

auth.makeHashedPassword(
  "password123",
  process.env.ENCYPTION_SECRET,
  process.env.SALT_NUM
);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/api/status", (req, res) => {
  res.send({ status: "Server is running" });
});

// jokes routes
app.use("/api/joke", jokesRoute);

//users routes
app.use("/api/user", usersRoute);

// products routes
app.use("/api/product", prductRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//
const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");

const app = express();

// constants
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/demo";

mongoose
  .connect(DB_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Failed to connect to DB : ", err));

// middlewares
app.use(cors());
app.use(express.json());

// routing
app.post("/users/create", userController.create);
app.put("/users/:id", userController.update);
app.delete("/users/:id", userController.remove);
app.get("/users/:id?", userController.get);

app.post("/auth/login", authController.login);

app.listen(PORT, (req, res) => {
  console.log(`App is running on port : ${PORT}`);
});

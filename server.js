const express = require("express");
const HttpError = require("./helper/HttpError");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
const gptRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const { Configuration, OpenAIApi } = require("openai");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

const openApi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.Secret_Key,
  })
);

app.set("gpt", openApi);

app.use(gptRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
  const errors = new HttpError("no routes found for this path  ", 404);
  return next(errors);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured" });
});

app.listen(process.env.POR);

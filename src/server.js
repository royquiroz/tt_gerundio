require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

// import { appConfig } from "./config";

const PORT = process.env.PORT || 4001;
const DB = process.env.DB;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${DB}`)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(
  cors({
    origin: [`http://localhost:${PORT}`],
  })
);

// Settings
app.set("port", PORT);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/user", userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

module.exports = { app, server };

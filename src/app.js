import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";

import { appConfig } from "./config";

const PORT = appConfig.app.port;
const DB = appConfig.db.url;

mongoose
  .connect(DB, { useNewUrlParser: true })
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
app.set("port", appConfig.app.port);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/user", userRoutes);

export default app;

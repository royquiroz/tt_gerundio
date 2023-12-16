import { config } from "dotenv";

config();

const { PORT, DB } = process.env;

export const appConfig = {
  app: {
    port: PORT || 4000,
  },
  db: {
    url: `mongodb://127.0.0.1:27017/${DB}`,
  },
};

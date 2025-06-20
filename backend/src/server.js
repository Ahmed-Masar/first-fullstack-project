import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import netosRouter from "./routes/notesRouter.js";
import { conncetDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", netosRouter);

conncetDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server startes on port ${PORT}`);
  });
});

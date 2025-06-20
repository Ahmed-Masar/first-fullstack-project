import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import netosRouter from "./routes/notesRouter.js";
import { conncetDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", netosRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

conncetDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server startes on port ${PORT}`);
  });
});

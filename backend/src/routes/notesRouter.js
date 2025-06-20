import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  upadateNotes,
  getSingleNote,
} from "../controllers/notescontrolles.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getSingleNote);

router.post("/", createNotes);

router.put("/:id", upadateNotes);

router.delete("/:id", deleteNotes);

export default router;

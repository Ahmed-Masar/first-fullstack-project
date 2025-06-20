import Note from "../model/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ notes });
  } catch (error) {
    console.error("error in get all notes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid id ${id}` });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error("error in create note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await new Note({ title, content });
    await newNote.save();
    res.status(201).json({ newNote });
  } catch (error) {
    console.error("error in create note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const upadateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    res.status(200).json({ updatedNote });
  } catch (error) {
    console.error("Error in update note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }
    const deleteNotes = await Note.findByIdAndDelete(id);
    if (!deleteNotes) res.status(404).json({ message: "note not found" });
    res.status(200).json("note deleted");
  } catch (error) {
    console.error("error in delete note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

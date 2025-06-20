import mongoose from "mongoose";

export const conncetDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connect DB sucssfuly");
  } catch (error) {
    console.error(`Error Connect To DB ${error}`);
  }
};

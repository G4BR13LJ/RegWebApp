import mongoose from "mongoose";

mongoose.set('strictQuery', true);

// Declares the url string to bes used to connect to the proper mongo db
export const connectDB = async () => {
  const url = `mongodb://localhost:27017/university`;
  try {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Failed to connect database:", e);
  }
};

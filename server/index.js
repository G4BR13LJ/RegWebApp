import cors from 'cors';
import express from "express";
import students from "./routes/student.route.js";
import { connectDB } from "./database/database.js";

const app = express()
app.use(cors())
app.use(express.json())

//-------connect to db-----------------
connectDB()

//-------Routing------------------------
app.use("/", students);

//----------start server----------------
app.listen(3001, () => {
    console.log("Server is online")
})
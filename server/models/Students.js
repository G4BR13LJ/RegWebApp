import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
})

const Student = mongoose.model("students", StudentSchema)
export default Student;
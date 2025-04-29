import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    departmentName: {type: String, required: true},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }]
});

const Course = mongoose.model("course", CourseSchema);
export default Course;
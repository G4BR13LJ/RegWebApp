// THIS ROUTE FILE IS FOR BOTH STUDENTS AND COURSES, NAMING SHOULD BE CHANGED BUT I AM AFRAID OF BREAKING STUFF
import express from "express";
import { getStudents, getStudent, updateStudent, createStudent } from "../controllers/student.controller.js";
import { getCourses, addCourse, enrollStudentInCourse, enrolledCourses, dropCourse } from "../controllers/course.controller.js";
const router = express.Router();

// Routes for connecting the frontend to backend
router.get("/", getStudents);
router.get("/getStudent/:id", getStudent);
router.post("/createStudent", createStudent);
router.patch("/updateStudent/:id", updateStudent);
router.get("/getCourses", getCourses);
router.post("/addCourse", addCourse);
router.patch("/enrollCourse/:id", enrollStudentInCourse);
router.get("/enrolledCourses/:id", enrolledCourses);
router.patch("/dropCourse/:id", dropCourse);

export default router;
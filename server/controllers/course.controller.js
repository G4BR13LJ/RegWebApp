import { getCoursesFromRepository, addCourseInRepository } from '../repositories/course.repository.js';
import Course from "../models/Course.js";


// Controller for getting all courses from the courses collection
export const getCourses = async (req, res) => {
    try {
        // Send a query to the repository to get all courses
        const courses = await getCoursesFromRepository({});
        res.status(200).send(courses);
    } catch (e) {
        res.status(500).send(e.message, 'failed to fetch a list of courses');
    }
}

// Controller for adding a course to the course collection
export const addCourse = async (req, res) => {
    const { body } = req;
    try {
        // Send the body contents to the add course repository function
        const course = await addCourseInRepository(body);
        res.status(200).send(course);
    } catch (e) {
        res.status(500).send(e.message, `failed to create student`);
    }
}

// The controllers below dont call any repository functions because i wanted to fully handle the logic here and not break up conditionals
// Controller for enrolling a student in a course
export const enrollStudentInCourse = async (req, res) => {
    const { id } = req.params;
    const { studentId } = req.body; 
    try {
        // Find the course by courseId
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Check if the student is already enrolled in the course
        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ error: "Student already enrolled in this course" });
        }

        // Check if the student is enrolled in any other course with the same start time
        const enrolledCoursesWithSameStartTime = await Course.find({
            _id: { $ne: id },
            enrolledStudents: studentId,
            startTime: course.startTime
        });

        if (enrolledCoursesWithSameStartTime.length > 0) {
            return res.status(400).json({ error: "Student is already enrolled in a course with the same start time" });
        }

        // Add the studentId to the enrolledStudents array
        course.enrolledStudents.push(studentId);

        // Save the updated course
        const updatedCourse = await course.save();

        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error("Error enrolling student in course:", error);
        res.status(500).json({ error: "Failed to enroll student in course" });
    }
}

// Controller for getting all courses a student is enrolled in
export const enrolledCourses = async (req, res) => {
    const { id } = req.params;
    try {
        const { id } = req.params;
    
        // Find all courses where the enrolledStudents array contains the specified studentId
        const enrolledCourses = await Course.find({ enrolledStudents: id });
        res.status(200).json(enrolledCourses);
      } catch (error) {
        console.error('Error retrieving enrolled courses:', error);
        res.status(500).json({ error: 'Failed to retrieve enrolled courses' });
      }
}

// Controller for removing a student from a course
export const dropCourse = async (req, res) => {
    const { id } = req.params;
    const { studentId } = req.body;
    try {
        // Find the course by courseId
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Remove the studentId from the enrolledStudents array
        course.enrolledStudents = course.enrolledStudents.filter(enrolledId => enrolledId.toString() !== studentId);

        // Save the updated course
        const updatedCourse = await course.save();
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error("Error dropping course:", error);
        res.status(500).json({ error: "Failed to drop course" });
    }
}
import Course from "../models/Course.js";

// Gets all courses from the courses collection
export const getCoursesFromRepository = async (query) => {
    try {
        const courses = await Course.find(query);
        return courses;
    } catch (e) {
        throw Error("Error while fetching course(s)");
    }
}

// Adds a course to the courses collection
export const addCourseInRepository = async (payload) => {
    try {
      const newCourse = new Course(payload);
      const savedCourse = await newCourse.save();
      return savedCourse;
    } catch (e) {
      throw Error("Error while creating a student");
    }
}
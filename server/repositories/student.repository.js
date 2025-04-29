import Student from "../models/Students.js";

// Function to find students from the students collection based on a query
export const getStudentsFromRepository = async (query) => {
    try {
      const students = await Student.find(query);
      return students;
    } catch (e) {
      throw Error("Error while fetching student(s)");
    }
}

// Function to update a student from the students collection
export const updateStudentInRepository = async (query, update) => {
    try {
      const student = await Student.findOneAndUpdate(
        { ...query },
        { ...update },
        { new: true }
      ).lean();
      return student;
    } catch (e) {
      throw Error("Error while updating student");
    } 
}

// Function to create a student in the students collection
export const createStudentInRepository = async (payload) => {
    try {
      const newStudent = new Student(payload);
      const savedStudent = await newStudent.save();
      return savedStudent;
    } catch (e) {
      throw Error("Error while creating a student");
    }
}
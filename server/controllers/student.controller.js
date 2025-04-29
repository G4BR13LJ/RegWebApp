import { getStudentsFromRepository, updateStudentInRepository, createStudentInRepository } from '../repositories/student.repository.js';

// Gets list of students from students collection
export const getStudents = async (req, res) => {
    try {
      const students = await getStudentsFromRepository({});
      console.log(students)
      res.status(200).send(students);
    } catch (e) {
      res.status(500).send(e.message, 'failed to fetch a list of students');
    }
}

// Gets a signle student from students collection
export const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await getStudentsFromRepository({ _id: id });
      res.status(200).send(student);
      console.log(student)
    } catch (e) {
      res.status(500).send(e.message, `failed to fetch student ${id}`);
    }
}

// Adds a student to the students collection
export const createStudent = async (req, res) => {
    const { body } = req;
    try {
      const student = await createStudentInRepository(body);
      console.log(student);
      res.status(200).send(student);
    } catch (e) {
      res.status(500).send(e.message, `failed to create student`);
    }
}

// Updates a student from the students collection
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const monster = await updateStudentInRepository({ _id: id }, body);
      res.status(200).send(monster);
    } catch (e) {
      res.status(500).send(e.message, `failed to update student ${id}`);
    }
}
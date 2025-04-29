import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Students.styles.css';

// This component is effectively the home screen of the application as of now
function Students () {
    const [students, setStudents] = useState([])

    // Use effect to get all the students from the database
    useEffect( () => {
        axios.get('http://localhost:3001')
        .then(result => setStudents(result.data))
        .catch(err => console.log(err))
    }, [])

    // Elements to be displayed by this component
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-60 bg-white rounded p-3">
                <Link to="/create" className='btn btn-secondary'> Add a Student +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student) => {
                                return <tr key={student.ID}>
                                    <td>{student.ID}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/courses/${student._id}`} className='btn btn-success rounded-end'>View/Enroll Courses</Link>
                                            <Link to={`/update/${student._id}`} className='btn btn-warning rounded-start'>Update Student Info</Link>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Students;
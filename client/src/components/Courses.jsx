import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './Courses.styles.css';

function Courses () {
    const {id} = useParams()
    const [courses, setCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [studentName, setStudentName] = useState();

    // Use effect to get all courses from the courses database
    useEffect( () => {
        axios.get('http://localhost:3001/getCourses')
        .then(result => setCourses(result.data))
        .catch(err => console.log(err))
    }, [])

    // Use effect to get all courses the current student is enrolled in
    useEffect( () => {
        axios.get(`http://localhost:3001/enrolledCourses/${id}`)
        .then(result => setEnrolledCourses(result.data))
        .catch(err => console.log(err))
    }, [])

    // function to handle the enroll button press
    const handleEnroll = async (courseId) => {
        try {
            await axios.patch(`http://localhost:3001/enrollCourse/${courseId}`, { studentId: id });
            alert("Successfully enrolled!");
            // Refresh the list of enrolled courses after enrolling
            const updatedEnrolledCourses = await axios.get(`http://localhost:3001/enrolledCourses/${id}`);
            setEnrolledCourses(updatedEnrolledCourses.data);
        } catch (error) {
            // pop up to display error types
            if (error.response.data.error === "Student already enrolled in this course") {
                alert("You are already enrolled in this course!");
            }
            if (error.response.data.error === "Student is already enrolled in a course with the same start time") {
                alert("You canot enroll in a class that has a time conflict with your shcedule/!"); 
            } else {
                console.error('Error enrolling in course:', error);
            }
        }
    };

    // Use effect to fetch student's name based on the id
    useEffect( () => {
        console.log(id);
        axios.get(`http://localhost:3001/getStudent/${id}`)
        .then(result => setStudentName(result.data[0].name))
        .catch(err => console.log(err));
    }, [])

    // function to handle the drop course button press
    const handleDrop = async (courseId) => {
        try {
            console.log("course id: " + courseId);
            await axios.patch(`http://localhost:3001/dropCourse/${courseId}`, { studentId: id });
            alert("Successfully dropped course!");
            // Refresh the list of enrolled courses after dropping
            const updatedEnrolledCourses = await axios.get(`http://localhost:3001/enrolledCourses/${id}`);
            setEnrolledCourses(updatedEnrolledCourses.data);
        } catch (error) {
            console.error('Error dropping course:', error);
        }
    };

    // Function to parse time string into minutes since midnight for proper sorting and displaying
    const parseTimeToMinutes = (timeString) => {
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
        if (period.toLowerCase() === 'pm') {
            totalMinutes += 12 * 60;
        }
        return totalMinutes;
    };

    // Elements to be displayed by this component
    return (
        <div className='vh-100 bg-primary d-flex align-items-center flex-column'>
            <div className='w-50 bg-white rounded p-3 mb-3'>
            <div className="btn-group">
                <Link to={`/addCourse/${id}`} className='btn btn-secondary rounded-end'>Add A Course +</Link>
                <Link to="/" className='btn btn-secondary rounded-start'>Back to View Students</Link>
            </div>
            <table className="table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Department Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            courses.map((course) => {
                                return <tr key={course._id}>
                                    <td>{course.title}</td>
                                    <td>{course.departmentName}</td>
                                    <td>{course.startTime}</td>
                                    <td>{course.endTime}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => handleEnroll(course._id)}>Enroll</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='w-50 bg-white rounded p-3'>
                <h3>Enrolled Courses for {studentName}</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Department Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        enrolledCourses.sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime)).map((course) => {
                            return <tr key={course._id}>
                                <td>{course.title}</td>
                                <td>{course.departmentName}</td>
                                <td>{course.startTime}</td>
                                <td>{course.endTime}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDrop(course._id)}>Drop Class</button>
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

export default Courses;
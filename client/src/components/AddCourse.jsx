import React,  { useState } from "react";
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

function AddCourse () {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const enrolled = []
    const navigate = useNavigate()

    // Regular expression for time format (HH:MM am/pm)
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;

    // Submit function to send input data to the backend to create a new course object
    const Submit = (e) => {
        e.preventDefault();

        // Validate start time format
        if (!timeRegex.test(startTime)) {
            alert("Please enter a valid start time format (HH:MM am/pm)");
            return;
        }
        // Validate end time format
        if (!timeRegex.test(endTime)) {
            alert("Please enter a valid end time format (HH:MM am/pm)");
            return;
        }

        axios.post("http://localhost:3001/addCourse", {title, departmentName, startTime, endTime, enrolled})
        .then(result => {
            window.alert("Course added successfully!");
            setTitle("");
            setDepartmentName("");
            setStartTime("");
            setEndTime("");
        })
        .catch(err => console.log(err))
    }

    // Elements to be displayed by the component
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2> Add Course</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Course Name</label>
                        <input type="text" placeholder='Enter Course Name' className='form-control'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Department Name</label>
                        <input type="text" placeholder='Enter Dept Name' className='form-control'
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Start Time</label>
                        <input type="text" placeholder='Enter Start Time' className='form-control'
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">End Time</label>
                        <input type="text" placeholder='Enter End Time' className='form-control'
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}/>
                    </div>
                    <div className="btn-group">
                        <button className='btn btn-success rounded-end' >Submit</button>
                        <Link to={`/courses/${id}`} className='btn btn-secondary rounded-start'>Back to Courses Page</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCourse;
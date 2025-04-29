import React,  { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CreateStudent () {
    const [ID, setID] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    // Submit function that sends input data to the backend to create a student object
    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createStudent", {ID, name, email})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    // Elements to be displayed by the component
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2> Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="">ID</label>
                        <input type="text" placeholder='Enter ID' className='form-control'
                        onChange={(e) => setID(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder='Enter Email' className='form-control'
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="btn-group">
                        <button className='btn btn-success rounded-end'>Submit</button>
                        <Link to="/" className='btn btn-secondary rounded-start'>Back to View Students</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateStudent;
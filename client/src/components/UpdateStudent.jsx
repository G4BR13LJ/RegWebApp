import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function UpdateStudent () {
    const {id} = useParams()
    const [ID, setID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const navigate = useNavigate()

    // Track mounting to avoid double posting from useEffect (not sure if this is neccessary, no bugs without it)
    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, [])

    // Use effect for getting the current student from the db by their _id value (to populate the input fields text)
    useEffect(() => {
        // If id is set and useEffect has mounted once, then execute the get (conditional is for avoiding the double posting side effect)
        if (isMounted && id) {
            axios.get('http://localhost:3001/getStudent/' + id)
                .then(result => {console.log(result)
                    const { ID, name, email } = result.data[0];
                    setID(ID);
                    setName(name);
                    setEmail(email);
                })
                .catch(err => console.log(err))
        }
    }, [id, isMounted])

    // Update function for update btn to send input field value to the backend to update the current students info
    const Update = (e) => {
        e.preventDefault();
        // Axios patch string before i learned how to use backticks for format strings ;P
        axios.patch("http://localhost:3001/updateStudent/" + id, {ID, name, email})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    // Elements to be displayed by this component
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="">ID</label>
                        <input type="text" placeholder="ID" className='form-control' value={ID}
                        onChange={(e) => setID(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="name" className='form-control' value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="email" className='form-control'value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="btn-group">
                        <button className='btn btn-success rounded-end'>Update</button>
                        <Link to="/" className='btn btn-secondary rounded-start'>Back to View Students</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent;
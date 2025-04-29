import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist//css/bootstrap.min.css'
import Students from './components/Students'
import CreateStudent from './components/CreateStudent'
import UpdateStudent from './components/UpdateStudent'
import Courses from './components/Courses'
import AddCourse from './components/AddCourse'


function App() {
  const [count, setCount] = useState(0)

  // Define the front end routing
  return (
    <BrowserRouter>
      <div className="App">
        <div className="vh-100 bg-primary">
          <Routes>
            <Route path='/' element={<Students />}></Route>
            <Route path='/create' element={<CreateStudent />}></Route>
            <Route path='/update/:id' element={<UpdateStudent />}></Route>
            <Route path='/courses/:id' element={<Courses />}></Route>
            <Route path='/addCourse/:id' element={<AddCourse />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

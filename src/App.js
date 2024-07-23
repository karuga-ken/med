import React from 'react'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import About from './Components/About'
import Share from './Components/Share'
import Footer from './Components/Footer'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import ForgotPassword from './Components/ForgotPassword'
import DoctorsDashboard from './Components/DoctorsDashboard'
import PatientList from './Components/PatientList'
import PatientPage from './Components/PatientPage'
import PatientDashboard from './Components/PatientDashboard'
import PatientSignup from './Components/PatientSignup'
import PatientSignin from './Components/PatientSignin'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path= "/" element={
          <>
          <Navbar/>
          <Landing/>
          <About/>
          <Share/>
          <Footer/>
          </>
        }></Route> 

        <Route path='/access-records' element={
          <>
          <Navbar/>
          <Signup/>
          </>
        }>
        </Route>

        <Route path='/sign-in' element={
          <>
          <Navbar/>
          <Signin/>
          </>
        }></Route>

        <Route path="/forgot-password" element={
          <>
          <Navbar/>
          <ForgotPassword/>
          </>
        }></Route>

        <Route path='/doc' element={
          <>
          <DoctorsDashboard/>
          </>
        }></Route>

        <Route path ='/patient-list' element={
          <>
          <PatientList/>
          </>
        }></Route>
        <Route path='/patient-page' element={
          <>
          <PatientPage/>
          </>
        }>
          

        </Route>

        {/* <Route path='/medical-records' element={
          <>
          <MedicalRecords/>
          </>
        }></Route> */}

        <Route path = '/patient-access' element={
          <>
          <PatientSignup/>
          </>
          
        }>
        </Route>

        <Route path = '/patient-signin' 
        element={
          <PatientSignin/>
        }></Route>

        <Route path='/patient-dashboard' element={
          <>
          <PatientDashboard/>
          </>
        }></Route>
      </Routes>
    </Router>


    </>
  )
}

export default App
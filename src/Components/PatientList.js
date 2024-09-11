import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faFolderOpen, faBars, faTimes, faHeartPulse, faUserTie, faRightFromBracket, faBell, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PatientList() {
  const [isOpen, setIsOpen] = useState(false); // State to handle navbar visibility
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [patients, setPatients] = useState([]);
  const [patientData, setPatientData] = useState({
    name: '',
    national_id: '',
    date_of_birth: '',
    age: '',
    last_appointment: ''
  });
  const navigate = useNavigate();

  
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4040/get-patients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}` // Replace with your JWT token retrieval logic
          }
        });
        setPatients(response.data.filter(patient => patient != null));
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    
    useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formattedData = {
      ...patientData,
      date_of_birth: new Date(patientData.date_of_birth).getTime() / 1000,
      last_appointment: new Date(patientData.last_appointment).getTime() / 1000,
    };

    try {
      const response = await axios.post('http://127.0.0.1:4040/add-patient', formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}` // JWT token retrieval logic
        }
      });
      console.log(response.data);
      setShowModal(false);
      setSuccessMessage('Patient added successfully!');
      setPatients([...patients, response.data]); // Add new patient to the list
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  const handlePatientClick = (patient) => {
    navigate('/patient-page', {state: {patient}});
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='flex bg-gray-200'>
      <div
            className={`bg-oxford-blue sm:w-1/4 flex flex-col gap-5 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } sm:relative sm:translate-x-0 sm:block`}
            
          >
          <div className='flex-start justify-center p-4 pl-10 mb-10'>
            <h1 className='w-9/12 font-bold text-white text-2xl' style={{ letterSpacing: '8px' }}>
              <FontAwesomeIcon className='' icon={faFolderOpen} /> MediPlus
            </h1>
          </div>
          <div className='flex-start justify-center p-4 text-white text-xl font-semibold min-h-screen'>
            <ul className='flex flex-col gap-5 pl-5 '>
              <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'>
                <Link to='/doc'><FontAwesomeIcon className='' icon={faFolderOpen} /> Dashboard</Link>
              </li>
              <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'>
                <FontAwesomeIcon className='' icon={faCalendarCheck} /> Appointments
              </li>
              <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'>
                <Link to="/patient-list"><FontAwesomeIcon className='' icon={faHeartPulse} /> Patients</Link>
              </li>
              <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'>
                <FontAwesomeIcon className='' icon={faFileLines} /> Reports
              </li>
              <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'>
                <FontAwesomeIcon className='' icon={faUserTie} /> My Account
              </li>
            </ul>
          </div>
          <div className='flex-start justify-center p-4 text-white text-xl font-semibold pl-10'>
            <h1 className='hover:cursor-pointer  hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5'>
              <FontAwesomeIcon icon={faRightFromBracket} /> LogOut
            </h1>
          </div>
        </div>

        <div className='w-full'>
          <div className='p-5 flex flex-row sm:gap-40 flex justify-center bg-white'>
            <div className='sm:w-2/4 text-left'>
              {/* <h1>Hello, Dr. Packard</h1> */}
              <h1 className='sm:text-3xl font-bold p-2 text-center' style={{ letterSpacing: '2px' }}>Your Patient List</h1>
            </div>
            <div className='flex flex-row sm:gap-2 text-center'>
              {/* <p className='ml-10 p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}>
                <FontAwesomeIcon icon={faBell} />
              </p> */}
              <p className='text-center font-semibold p-2' style={{ letterSpacing: '2px' }}>Dr. Helwett Packard</p>
              {/* <p className='p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}>
                <FontAwesomeIcon icon={faUserTie} />
              </p> */}
               <button
            onClick={toggleNavbar}
            className='sm:hidden p-1 sm:text-2xl text-white bg-oxford-blue'>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
            </div>
          </div>

          <div className='p-5 flex gap-6 sm:pl-28 mb-5 mt-5'>
            <input className='bg-white p-2 w-full rounded-xl border-none' type='text' placeholder='Search For Patient'></input>
            {/* <button className='ml-28 w-1/5 bg-blue-500 rounded-md text-white' onClick={() => setShowModal(true)}>
              Add New Patient
            </button> */}
          </div>

          {successMessage && (
            <div className='bg-green-200 p-4 mb-4 rounded-lg text-green-800 text-center'>
              {successMessage}
            </div>
          )}

{patients.map((patient) => patient && (
  <div key={patient.id} className='bg-white mb-5 mx-5 flex items-center justify-between p-5 rounded-md cursor-pointer' onClick={() => handlePatientClick(patient)}>
    <div className='sm:flex sm:items-center sm:gap-10 w-full'>
      {/* Icon */}
      <div className='flex justify-center items-center'>
        <h1 className='font-semibold' style={{ fontSize: window.innerWidth < 768 ? "3rem" : "4rem" }}>
          <FontAwesomeIcon icon={faUserTie} />
        </h1>
      </div>

      {/* Patient Info */}
      <div className='pt-2 sm:pt-0 flex flex-col justify-center items-center justify-center items-center'>
        <p className=''><span className='font-semibold '>Name: </span> {patient.name}</p>
        <p className=''><span className='font-semibold '>D.O.B: </span>{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Health ID and Age */}
      <div className='pt-2 sm:pt-0 flex flex-col justify-center items-center justify-center items-center'>
        <p>Health ID: <span className='font-semibold'>{patient.national_id}</span></p>
        <p>Age: {patient.age} y/o</p>
      </div>

      {/* Call Button */}
      <div className='pt-2 sm:pt-0 flex flex-col justify-center items-center justify-center items-center'>
        <button className='rounded-md font-semibold bg-mikado-yellow text-xl text-white py-2 px-4'>
          <FontAwesomeIcon icon={faPhone} /> Call
        </button>
      </div>
    </div>
  </div>
))}


          {/* Modal for Adding New Patient */}
          {showModal && (
            <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white p-8 rounded-lg'>
                <h2 className='text-2xl mb-4'>Add New Patient</h2>
                <input
                  className='bg-gray-200 p-2 mb-4 w-full rounded-lg'
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={patientData.name}
                  onChange={handleChange}
                />
                <input
                  className='bg-gray-200 p-2 mb-4 w-full rounded-lg'
                  type='text'
                  name='national_id'
                  placeholder='National ID'
                  value={patientData.national_id}
                  onChange={handleChange}
                />
                <input
                  className='bg-gray-200 p-2 mb-4 w-full rounded-lg'
                  type='date'
                  name='date_of_birth'
                  placeholder='Date of Birth'
                  value={patientData.date_of_birth}
                  onChange={handleChange}
                />
                <input
                  className='bg-gray-200 p-2 mb-4 w-full rounded-lg'
                  type='number'
                  name='age'
                  placeholder='Age'
                  value={patientData.age}
                  onChange={handleChange}
                />
                <input
                  className='bg-gray-200 p-2 mb-4 w-full rounded-lg'
                  type='date'
                  name='last_appointment'
                  placeholder='Last Appointment'
                  value={patientData.last_appointment}
                  onChange={handleChange}
                />
                <div className='flex justify-end gap-4'>
                  <button className='bg-red-500 text-white p-2 rounded-lg' onClick={() => setShowModal(false)}>Cancel</button>
                  <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientList;

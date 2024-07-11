import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faFolderOpen, faHeartPulse, faUserTie, faRightFromBracket, faBell, faPhone} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MedicalRecords from './MedicalRecords';


function PatientPage() {
    const location = useLocation();
    const patient = location.state?.patient;
    const [showModal, setShowModal] = useState(false);
    const [modalClass, setModalClass] = useState('opacity-0 scale-95');
    const [medRecord, setMedRecord] = useState({
        Medical_allergies:'',
        Medical_Conditions:'',
        Prescriptions: '',
        Surgeries_Procedures:''
    })
    const [medSummary, setMedSummary] = useState([]);
    const [activeSection, setActiveSection] = useState('summary');
    const handleChange = (e) => {
        setMedRecord({...medRecord, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:4040/add-patient-record', {
                patient_id: patient.id,  // Assuming patient.id exists
                ...medRecord
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`  // If you're using JWT
                }
            });
            console.log(response.data);
            setShowModal(false);
            setMedRecord({
                Medical_allergies: '',
                Medical_Conditions: '',
                Prescriptions: '',
                Surgeries_Procedures: ''
            });
            // Optionally, you can update the UI to show the new record
        } catch (error) {
            console.error('Error adding patient record:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    useEffect(() => {
        const fetchMedSummary = async () => {
            
                try {
                    const response = await axios.get(`http://127.0.0.1:4040/medsummaryinfo/${patient.id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                    setMedSummary(response.data);
                } catch (error) {
                    console.error('Error fetching medical summary:', error);
                } 
        };
        fetchMedSummary();
    }, [patient]);



    useEffect(() => {
        if (showModal) {
            setTimeout(() => setModalClass('opacity-100 scale-100'), 10);
        } else {
            setModalClass('opacity-0 scale-95');
        }
    }, [showModal]);
    if(!patient){
        return <div>No data</div>
    }

    

    

    
  return (
    <div>

        <div className='flex bg-gray-200'>
        <div className='bg-oxford-blue  w-1/4 flex flex-col gap-5 '>
           <div className='flex-start justify-center p-4 pl-10 mb-10'>
               <h1 className='w-9/12 font-bold text-white text-2xl' style={{letterSpacing:'8px'}}><FontAwesomeIcon className='' icon={faFolderOpen} /> MediPlus</h1>
           </div>
           <div className='flex-start justify-center p-4 text-white text-xl font-semibold min-h-screen'>
               <ul className='flex flex-col gap-5 pl-5 '>
                   <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><Link to = '/doc'><FontAwesomeIcon className='' icon={faFolderOpen} /> Dashboard</Link></li>
                   <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faCalendarCheck} /> Appointments</li>
                   <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><Link to="/patient-list"><FontAwesomeIcon className='' icon={faHeartPulse} /> Patients</Link></li>
                   
                   <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faFileLines} /> Reports</li>
                   <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faUserTie} /> My Account</li>
               </ul>
           </div>

           <div className='flex-start justify-center p-4 text-white text-xl font-semibold pl-10'>
               <h1 className='hover:cursor-pointer  hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5'><FontAwesomeIcon icon={faRightFromBracket} /> LogOut</h1>
           </div>
       </div>
       

        <div className='mt-5 m-3 w-full'>
            <div className='bg-white mb-5 rounded-md cursor-pointer'>
                <div className='flex gap-20 align-center'>
                    <div className='pl-16'>
                    <h1 className=' font-semibold pl-10' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "5rem", color:'' }}><FontAwesomeIcon icon={faUserTie} /> </h1>
                    </div>

                    <div className='pt-5'>
                        <p className='font-semibold'>Name: {patient.name || 'nill'}</p>
                        <p>D.O.B: {patient.date_of_birth ? new Date(patient.date_of_birth * 1000).toLocaleDateString() : 'N/A'}</p>
                        <p>Age: {patient.age ? `${patient.age} y/o` : 'Age not available'}</p>
                    </div>

                    <div className='pt-5 mr-32'>
                        <p>Health ID: <span className='font-semibold'>{patient.national_id}</span></p>
                        <h1>Last Appointment: {patient.last_appointment ? new Date(patient.last_appointment * 1000).toLocaleDateString() : 'N/A'}</h1>
                    </div>

                    <div className='pt-8 pb-8 ml-20 flex p-2'>
                        <button className='rounded-md mt-2 mb-2  font-semibold bg-mikado-yellow text-xl text-white p-2 pl-2 pr-2' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem", color:'' }}><FontAwesomeIcon icon={faPhone} /> Call</button>
                        <button onClick={() => setShowModal(true)} className='rounded-md m-2  font-semibold bg-mikado-yellow text-xl text-white p-2 pl-2 pr-2 hover:bg-oxford-blue' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem", color:'' }}><FontAwesomeIcon icon={faFileLines} /> Add Medical Info</button>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 pl-20 mt-10 font-semibold flex justify-center'>
                <h1 
                    className={`mr-12 cursor-pointer ${activeSection === 'summary' ? 'border-b-mikado-yellow' : ''} border-4 border-gray-200 p-2`}
                    onClick={() => setActiveSection('summary')}
                >
                    Summarized Medical Info
                </h1>
                <h1 
                    className={`mr-12 cursor-pointer ${activeSection === 'records' ? 'border-b-mikado-yellow' : ''} border-4 border-gray-200 p-2`}
                    onClick={() => setActiveSection('records')}
                >
                    Medical Records & Diagnostics
                </h1>
                {/* <h1 className='mr-12 cursor-pointer hover:border-b-mikado-yellow border-4 border-gray-200 p-2'>Past Treatments</h1> */}
            </div>

            {activeSection === 'summary' && medSummary ? (
    <div className='flex flex-wrap gap-10 w-full justify-center max-h-full mt-5'>
        <div className='bg-white w-1/3 p-2 rounded-md shadow-md' style={{height:'300px'}}>
            <div className='font-semibold'>
                <h1>Medical Allergies</h1>
            </div>
            <div className='p-4 flex flex-wrap'>
                {medSummary.Medical_allergies && medSummary.Medical_allergies.split(',').map((allergy, index) => (
                    <h1 key={index} className='w-full mb-5'>{allergy.trim()}</h1>
                ))}
            </div>
        </div>

        <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
            <div className='font-semibold'>
                <h1>Medical Conditions</h1>
            </div>
            <div className='p-4 flex flex-wrap'>
                {medSummary.Medical_Conditions && medSummary.Medical_Conditions.split(',').map((condition, index) => (
                    <h1 key={index} className='w-full mb-5'>{condition.trim()}</h1>
                ))}
            </div>
        </div>

        <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
            <div className='font-semibold'>
                <h1>Medications/Prescriptions</h1>
            </div>
            <div className='p-4 flex flex-wrap'>
                {medSummary.Prescriptions && medSummary.Prescriptions.split(',').map((prescription, index) => (
                    <h1 key={index} className='w-full mb-5'>{prescription.trim()}</h1>
                ))}
            </div>
        </div>

        <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
            <div className='font-semibold'>
                <h1>Surgeries and Procedures</h1>
            </div>
            <div className='p-4 flex flex-wrap'>
                {medSummary.Surgeries_Procedures && medSummary.Surgeries_Procedures.split(',').map((surgery, index) => (
                    <h1 key={index} className='w-full mb-5'>{surgery.trim()}</h1>
                ))}
            </div>
        </div>
    </div>
) : (
    <MedicalRecords/>
)}
        </div>

        {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl w-1/2">
                        <h2 className="text-xl mb-4 font-bold">Add Medical Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Medical_allergies">
                                    Medical Allergies
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Medical_allergies"
                                    name="Medical_allergies"
                                    value={medRecord.Medical_allergies}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Medical_Conditions">
                                    Medical Conditions
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Medical_Conditions"
                                    name="Medical_Conditions"
                                    value={medRecord.Medical_Conditions}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Prescriptions">
                                    Prescriptions
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Prescriptions"
                                    name="Prescriptions"
                                    value={medRecord.Prescriptions}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Surgeries_Procedures">
                                    Surgeries and Procedures
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Surgeries_Procedures"
                                    name="Surgeries_Procedures"
                                    value={medRecord.Surgeries_Procedures}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
      
        
        </div>
    
    </div>
  )
}

export default PatientPage
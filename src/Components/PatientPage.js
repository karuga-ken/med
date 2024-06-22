import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faFolderOpen, faHeartPulse, faUserTie, faRightFromBracket, faBell, faPhone} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function PatientPage() {
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
                        <p className='font-semibold'>Jones Well</p>
                        <p>D.O.B: 9-3-2003</p>
                        <p>20 y/o Male</p>
                    </div>

                    <div className='pt-5 mr-32'>
                        <p>Health ID: <span className='font-semibold'>004</span></p>
                        <h1>Last Appointment: 2 April, 2024</h1>
                    </div>

                    <div className='pt-8 ml-44'>
                        <button className='rounded-md  font-semibold bg-mikado-yellow text-xl text-white p-2 pl-5 pr-5' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem", color:'' }}><FontAwesomeIcon icon={faPhone} /> Call</button>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 pl-20 mt-10 font-semibold flex justify-center'>
                <h1 className='mr-12 cursor-pointer hover:border-b-mikado-yellow border-4 border-gray-200 p-2  '>Medical Records</h1>
                <h1 className='mr-12 cursor-pointer hover:border-b-mikado-yellow border-4 border-gray-200 p-2'>Lab Results</h1>
                <h1 className='mr-12 cursor-pointer hover:border-b-mikado-yellow border-4 border-gray-200 p-2'>Past Treatments</h1>
            </div>

            <div className='flex flex-wrap gap-10 w-full justify-center max-h-full mt-5 '>
                <div className='bg-white w-1/3 p-2 rounded-md shadow-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                        <h1>Medical Allergies</h1>
                    </div>
                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Peanut Allergy</h1>
                        <h1 className='w-full mb-5'>Penicillin allergy</h1>
                        <h1 className='w-full mb-5'>Lactose Intolerant</h1>
                    </div>
                </div>

                <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                            <h1>Medical Conditions</h1>
                    </div>

                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Asthma</h1>
                        <h1 className='w-full mb-5'>Type 2 Diabetes</h1>
                        <h1 className='w-full mb-5'>Hypertension-High Blood Pressure</h1>
                    </div>
                </div>

                <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                            <h1>Medications/Prescriptions</h1>
                    </div>
                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Paracetamol (2 * 3)</h1>
                        <h1 className='w-full mb-5'>Flu-gone (1tbsp * 3)</h1>
                        <h1 className='w-full mb-5'>Zyrtal Mr (1 * 2)</h1>
                    </div>
                    </div>

                <div className='bg-white w-1/3 p-2 shadow-md rounded-md' style={{height:'300px'}}>
                    <div className='font-semibold'>
                            <h1>Surgeries and Procedures</h1>
                    </div>

                    <div className='p-4 flex flex-wrap'>
                        <h1 className='w-full mb-5'>Colonoscopy (23-06-2023)</h1>
                        <h1 className='w-full mb-5'>Appendectomy (12-1-2024)</h1>
                    </div>
                </div>
            </div>
        </div>
       
      
        
        </div>
    
    </div>
  )
}

export default PatientPage
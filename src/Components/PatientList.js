import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faFolderOpen, faHeartPulse, faUserTie, faRightFromBracket, faBell, faPhone} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

function PatientList() {
  return (
    <>
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


       <div className=' w-full'>
           <div className='p-5 flex flex-row gap-40 flex justify-center  bg-white'>
               {/* <input className='bg-gray-100 p-2 w-2/4 rounded-xl border-none' type='text' placeholder='Search'></input> */}
               <div className='w-2/4 text-left'>
                <h1>Hello, Dr. Packard</h1>
                <h1 className='text-3xl font-bold'style={{letterSpacing:'2px'}}>Your Patient List</h1>
               </div>

               <div className='flex flex-row gap-2   text-center'>
                   <p className='ml-10 p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}><FontAwesomeIcon icon={faBell} /> </p>
                   <p className='text-center font-semibold p-2'style={{letterSpacing:'2px'}}>Dr. Helwett Packard</p>
                   <p className=' p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}><FontAwesomeIcon icon={faUserTie} /> </p>
               </div>
           </div>

           <div className='p-5 flex gap-6 pl-28 mb-5 mt-5'>
            <input className='bg-white p-2 w-3/5 rounded-xl border-none' type='text' placeholder='Search For Patient'></input>
            <button className='ml-28 w-1/5 bg-blue-500 rounded-md text-white'>Add New Patient</button>
           </div>

           <div className='bg-white mb-5 cursor-pointer'>
            <Link to='/patient-page'>
            <div className='flex gap-20 align-center'>
                <div className='pl-16'>
                <h1 className=' font-semibold pl-10' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "5rem", color:'' }}><FontAwesomeIcon icon={faUserTie} /> </h1>
                </div>

                <div className='pt-5'>
                    <p className='font-semibold'>Mihir Shamar</p>
                    <p>D.O.B: 9-3-2003</p>
                    <p>20 y/o Male</p>
                </div>

                <div className='pt-5 mr-32'>
                    <p>Health ID: <span className='font-semibold'>003</span></p>
                    <h1>Last Appointment: 2 April, 2024</h1>
                </div>

                <div className='pt-8 ml-44'>
                    <button className='rounded-md  font-semibold bg-mikado-yellow text-xl text-white p-2 pl-5 pr-5' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem", color:'' }}><FontAwesomeIcon icon={faPhone} /> Call</button>
                </div>
            </div>
            </Link>

           </div>

           <div className='bg-white mb-5 cursor-pointer'>
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

           <div className='bg-white mb-5 cursor-pointer'>
            <div className='flex gap-20 align-center'>
                <div className='pl-16'>
                <h1 className=' font-semibold pl-10' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "5rem", color:'' }}><FontAwesomeIcon icon={faUserTie} /> </h1>
                </div>

                <div className='pt-5'>
                    <p className='font-semibold'>Michael Huddle</p>
                    <p>D.O.B: 9-3-2003</p>
                    <p>20 y/o Male</p>
                </div>

                <div className='pt-5 mr-32'>
                    <p>Health ID: <span className='font-semibold'>002</span></p>
                    <h1>Last Appointment: 2 April, 2024</h1>
                </div>

                <div className='pt-8 ml-44'>
                    <button className='rounded-md  font-semibold bg-mikado-yellow text-xl text-white p-2 pl-5 pr-5' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem", color:'' }}><FontAwesomeIcon icon={faPhone} /> Call</button>
                </div>
            </div>
           </div>

           <div className='bg-white mb-5 cursor-pointer'>
            <div className='flex gap-20 align-center'>
                <div className='pl-16'>
                <h1 className=' font-semibold pl-10' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "5rem", color:'' }}><FontAwesomeIcon icon={faUserTie} /> </h1>
                </div>

                <div className='pt-5'>
                    <p className='font-semibold'>Mirian Candle</p>
                    <p>D.O.B: 9-3-2003</p>
                    <p>20 y/o Male</p>
                </div>

                <div className='pt-5 mr-32'>
                    <p>Health ID: <span className='font-semibold'>001</span></p>
                    <h1>Last Appointment: 2 April, 2024</h1>
                </div>

                <div className='pt-8 ml-44'>
                    <button className='rounded-md  font-semibold bg-mikado-yellow text-xl text-white p-2 pl-5 pr-5' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem", color:'' }}><FontAwesomeIcon icon={faPhone} /> Call</button>
                </div>
            </div>
           </div>

       </div>

       

       
</div>



    </>
  )
}

export default PatientList
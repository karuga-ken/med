import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faCalendar, faFolderOpen, faHeartPulse, faPerson, faUserTie, faRightFromBracket, faBell, faScissors} from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';

function DoctorsDashboard() {
  return (
    <>
        <div className='flex bg-gray-200'>
       
       <div className='bg-oxford-blue  w-1/4 flex flex-col gap-5'>
           <div className='flex-start justify-center p-4 pl-10 mb-10'>
               <h1 className='w-9/12 font-bold text-white text-2xl' style={{letterSpacing:'8px'}}><FontAwesomeIcon className='' icon={faFolderOpen} /> MediPlus</h1>
           </div>
           <div className='flex-start justify-center p-4 text-white text-xl font-semibold h-screen'>
               <ul className='flex flex-col gap-5 pl-5 '>
                   <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faFolderOpen} /> Dashboard</li>
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


       <div className=' w-full h-screen'>
           <div className='p-5 pl-10 flex flex-row gap-40 flex justify-center  text-center bg-white'>
               <input className='bg-gray-100 p-2 w-2/4 rounded-xl border-none' type='text' placeholder='Search'></input>
               <div className='flex flex-row gap-2   text-center'>
                   <p className='ml-10 p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}><FontAwesomeIcon icon={faBell} /> </p>
                   <p className='text-center font-semibold p-2'style={{letterSpacing:'2px'}}>Dr. Helwett Packard</p>
                   <p className=' p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}><FontAwesomeIcon icon={faUserTie} /> </p>
               </div>
           </div>

           <div className='p-5 flex gap-1'>
            <div className='p-5 w-4/5'>
                    <div className='p-5 pl-10 w-3/5'>
                        <h1 className='font-semibold text-2xl' style={{letterSpacing:'3px'}}>Hello, Dr. Packard</h1>
                        <h1 className='font-light'>Have a great day at work!!</h1>
                    </div>

                    <div className='p-5 pl-10 '>
                        <h1 className='font-semibold mb-5 text-2xl'>Weekly Reports</h1>
                        <div className='flex gap-5 '>
                            <div className='bg-white flex flex-col py-5 rounded-md shadow-2xl' style={{width:'200px'}}>
                                <p className=' p-2 justify-center bg-blue-500 mt-2 mb-2 w-1/4 mx-auto rounded-md flex font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "2rem", color:'white' }}><FontAwesomeIcon icon={faPerson} /> </p>
                                <p className='justify-center flex font-semibold'>Total Patients</p>
                                <p className='justify-center flex font-bold'>580</p>
                            </div>

                            <div className='bg-white flex flex-col py-5 rounded-md shadow-2xl' style={{width:'200px'}}>
                                <p className=' p-2 justify-center bg-red-600 mt-2 mb-2 w-1/4 mx-auto rounded-md flex font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "2rem", color:'white' }}><FontAwesomeIcon icon={faCalendar} /> </p>
                                <p className='justify-center flex font-semibold'>Appointments</p>
                                <p className='justify-center flex font-bold'>140</p>
                            </div>

                            <div className='bg-white flex flex-col py-5 rounded-md shadow-2xl' style={{width:'200px'}}>
                                <p className=' p-2 justify-center bg-blue-500 mt-2 mb-2 w-1/4 mx-auto rounded-md flex font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "2rem", color:'white' }}><FontAwesomeIcon icon={faScissors} /> </p>
                                <p className='justify-center flex font-semibold'>Surgery</p>
                                <p className='justify-center flex font-bold'>2</p>
                            </div>
                        </div>

                    </div>
            </div>
            <div className='mt-0  mb-10 shadow-2xl rounded-md bg-white w-full'>
                <Calendar/>
            </div>

           </div>
           
        <div className=' p-5 pl-10  flex'>
            <div className=' pl-10 p-5 w-2/3'>
                <table className=' bg-white w-full rounded-md shadow-2xl'>
                    <tr >
                        <th className='p-2 text-left font-light'>Name</th>
                        <th className='p-2 text-left font-light'>Gender</th>
                        <th className='p-2 text-left font-light'>Date</th>
                        <th className='p-2 text-left font-light'>Disease</th>
                        <th className='p-2 text-left font-light'>Status</th>
                    </tr>
                    <tr>
                        <td className='p-2 font-semibold'>Steve Jobs</td>
                        <td className='p-2 font-semibold'>Male</td>
                        <td className='p-2 font-semibold'>03 Apr</td>
                        <td className='p-2 font-semibold'>Malaria</td>
                        <td className='p-2 font-semibold'>Outpatient</td>
                    </tr>
                    <tr>
                        <td className='p-2 font-semibold'>Faith Kings</td>
                        <td className='p-2 font-semibold'>Female</td>
                        <td className='p-2 font-semibold'>04 Apr</td>
                        <td className='p-2 font-semibold'>Cholera</td>
                        <td className='p-2 font-semibold'>Outpatient</td>
                    </tr>
                    <tr>
                        <td className='p-2 font-semibold'>Stephen King</td>
                        <td className='p-2 font-semibold'>Male</td>
                        <td className='p-2 font-semibold'>04 Apr</td>
                        <td className='p-2 font-semibold'>Typhoid</td>
                        <td className='p-2 font-semibold'>Inpatient</td>
                    </tr>
                    <tr>
                        <td className='p-2 font-semibold'>Collins Wales</td>
                        <td className='p-2 font-semibold'>Male</td>
                        <td className='p-2 font-semibold'>05 Apr</td>
                        <td className='p-2 font-semibold'>Leg Fracture</td>
                        <td className='p-2 font-semibold'>Inpatient</td>
                    </tr>
                    <tr>
                        <td className='p-2 font-semibold'>Moraa Jones</td>
                        <td className='p-2 font-semibold'>Female</td>
                        <td className='p-2 font-semibold'>05 Apr</td>
                        <td className='p-2 font-semibold'>Fever</td>
                        <td className='p-2 font-semibold'>Outpatient</td>
                    </tr>
                    <tr>
                        <td className='p-2 font-semibold'>Richard Samuel</td>
                        <td className='p-2 font-semibold'>Male</td>
                        <td className='p-2 font-semibold'>05 Apr</td>
                        <td className='p-2 font-semibold'>Tuberculosis</td>
                        <td className='p-2 font-semibold'>Inpatient</td>
                    </tr>
                </table>
            </div>

            <div className='w-1/3 p-5'>
                <div className='bg-white rounded-md flex flex-col shadow-2xl'>
                <h1 className='font-semibold text-2xl mb-1 text-center'>Appointments</h1>
                <div className=' p-5 rounded-md '>

                <div className='border-b-4 border-gray-300 px-auto'>
                    <h1 className='font-semibold mt-2'>Faith Kings <span className='ml-auto'><FontAwesomeIcon icon={faBell} /></span></h1>
                    <p className='font-light' style={{fontSize:"0.8rem"}}>Follow Up | 9:00am</p>
                    <div className='flex gap-5'>
                        <button type='submit'className='bg-gray-200 rounded-md text-blue-500 mt-2 mb-2 px-5 py-1'>Reschedule</button>
                        <button type='submit'className='bg-blue-500 rounded-md text-white mt-2 mb-2 px-5 py-1'>Cancel</button>
                    </div>

                </div>

                <div className=' px-auto'>
                    <h1 className='font-semibold mt-2'>Moraa Jones <span className='ml-auto'><FontAwesomeIcon icon={faBell} /></span></h1>
                    <p className='font-light' style={{fontSize:"0.8rem"}}>Follow Up | 11:00am</p>
                    <div className='flex gap-5'>
                        <button type='submit'className='bg-gray-200 rounded-md text-blue-500 mt-2 mb-2 px-5 py-1'>Reschedule</button>
                        <button type='submit'className='bg-blue-500 rounded-md text-white mt-2 mb-2 px-5 py-1'>Cancel</button>
                    </div>

                </div>
                </div>
                </div>
           
                
            </div>
       </div>

       </div>

       

       
</div>



    </>
  )
}

export default DoctorsDashboard
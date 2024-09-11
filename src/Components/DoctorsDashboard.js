import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faCalendar, faFolderOpen, faHeartPulse, faPerson, faUserTie, faRightFromBracket, faBell, faScissors, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';

function DoctorsDashboard() {
    const [docName, setDocName] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State to handle navbar visibility
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:4040/doc_data', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch doc data');
          }
          const docData = await response.json();
          setDocName(docData.name);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    // Toggle function for the sidebar
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <>
        <div className='flex bg-gray-200'>
          {/* Toggle Button for Mobile Screens */}
          
          {/* Sidebar */}
          <div
            className={`bg-oxford-blue sm:w-1/4 flex flex-col gap-5 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } sm:relative sm:translate-x-0 sm:block`}
            
          >
            <div className='flex-start justify-center p-4 sm:pl-10 mb-10'>
              <h1 className='sm:w-9/12 font-bold text-white sm:text-2xl' style={{ letterSpacing: '8px' }}>
                MediPlus
              </h1>
            </div>
  
            <div className='flex-start justify-center p-4 text-white sm:text-xl font-semibold h-screen'>
              <ul className='flex flex-col gap-5 sm:pl-5'>
                <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue sm:pl-5 hover:cursor-pointer border-0 sm:border'>
                  <FontAwesomeIcon icon={faFileLines} /> Dashboard
                </li>
                <Link to='/appointments'>
                  <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue sm:pl-5 hover:cursor-pointer border-0 sm:border'>
                    <FontAwesomeIcon icon={faCalendarCheck} /> Appointments
                  </li>
                </Link>
                <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue sm:pl-5 hover:cursor-pointer border-0 sm:border'>
                  <Link to='/patient-list'>
                    <FontAwesomeIcon icon={faHeartPulse} /> Patients
                  </Link>
                </li>
                <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue sm:pl-5 hover:cursor-pointer border-0 sm:border'>
                  <FontAwesomeIcon icon={faFileLines} /> Reports
                </li>
                <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue sm:pl-5 hover:cursor-pointer border-0 sm:border'>
                  <FontAwesomeIcon icon={faUserTie} /> My Account
                </li>
              </ul>
            </div>
  
            <div className='flex-start justify-center p-4 text-white text-xl font-semibold pl-10'>
              <h1 className='hover:cursor-pointer  hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 border-0 sm:border'>
                <FontAwesomeIcon icon={faRightFromBracket} /> LogOut
              </h1>
            </div>
          </div>


       <div className=' w-full h-screen'>
           <div className='p-5 sm:pl-10 sm:flex flex-row sm:gap-40 flex justify-center  text-center bg-white' style={{fontSize:''}}>
            
  
               <input className='bg-gray-100 p-2 w-2/4 rounded-xl border-none' type='text' placeholder='Search'></input>
               <div className='flex flex-row gap-2   text-center'>
                   {/* <p className='sm:ml-10 p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}><FontAwesomeIcon icon={faBell} /> </p> */}
                   <p className='text-center font-semibold sm:p-2'style={{letterSpacing:'2px'}}>Dr. {docName}</p>
                   {/* <p className=' p-2 font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1rem" }}><FontAwesomeIcon icon={faUserTie} /> </p> */}
                   <button
            onClick={toggleNavbar}
            className='sm:hidden p-1 sm:text-2xl text-white bg-oxford-blue'>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
               </div>
           </div>

           <div className='p-5 sm:flex gap-1'>
            <div className='p-5 sm:w-4/5'>
                    <div className='p-5 sm:pl-10 sm:w-3/5'>
                        <h1 className='font-semibold sm:text-2xl' style={{letterSpacing:'3px'}}>Hello, Dr. {docName}</h1>
                        <h1 className='font-light'>Have a great day at work!!</h1>
                    </div>

                    <div className='p-5 sm:pl-10 '>
                        <h1 className='font-semibold mb-5 text-2xl'>Weekly Reports</h1>
                        <div className='sm:flex gap-5 '>
                            <div className='bg-white mb-5 flex flex-col py-5 rounded-md shadow-2xl sm:w-full' style={{width: window.innerWidth < 768 ? '100%' : '200px'}}>
                                <p className=' p-2 justify-center bg-blue-500 mt-2 mb-2 w-1/4 mx-auto rounded-md flex font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "2rem", color:'white' }}><FontAwesomeIcon icon={faPerson} /> </p>
                                <p className='justify-center flex font-semibold'>Total Patients</p>
                                <p className='justify-center flex font-bold'>580</p>
                            </div>

                            <div className='bg-white mb-5 flex flex-col py-5 rounded-md shadow-2xl' style={{width: window.innerWidth < 768 ? '100%' : '200px'}}>
                                <p className=' p-2 justify-center bg-red-600 mt-2 mb-2 w-1/4 mx-auto rounded-md flex font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "2rem", color:'white' }}><FontAwesomeIcon icon={faCalendar} /> </p>
                                <p className='justify-center flex font-semibold'>Appointments</p>
                                <p className='justify-center flex font-bold'>140</p>
                            </div>

                            <div className='bg-white mb-5 flex flex-col py-5 rounded-md shadow-2xl' style={{width: window.innerWidth < 768 ? '100%' : '200px'}}>
                                <p className=' p-2 justify-center bg-blue-500 mt-2 mb-2 w-1/4 mx-auto rounded-md flex font-semibold' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "2rem", color:'white' }}><FontAwesomeIcon icon={faScissors} /> </p>
                                <p className='justify-center flex font-semibold'>Surgery</p>
                                <p className='justify-center flex font-bold'>2</p>
                            </div>
                        </div>

                    </div>
            </div>
            <div className='mt-0  mb-10 shadow-2xl rounded-md bg-white sm:w-full'>
                <Calendar/>
            </div>

           </div>
           
        <div className=' p-5 sm:pl-10  sm:flex'>
            <div className=' sm:pl-10 sm:p-5 sm:w-2/3'>
                <table className=' bg-white w-full rounded-md shadow-2xl'>
                    <tr >
                        <th className='sm:p-2 text-left font-light'>Name</th>
                        <th className='sm:p-2 text-left font-light'>Gender</th>
                        <th className='sm:p-2 text-left font-light'>Date</th>
                        <th className='sm:p-2 text-left font-light'>Disease</th>
                        <th className='p-2 text-left font-light'>Status</th>
                    </tr>
                    <tr>
                        <td className='sm:p-2 font-semibold'>Steve Jobs</td>
                        <td className='sm:p-2 font-semibold'>Male</td>
                        <td className='sm:p-2 font-semibold'>03 Apr</td>
                        <td className='sm:p-2 font-semibold'>Malaria</td>
                        <td className='sm:p-2 font-semibold'>Outpatient</td>
                    </tr>
                    <tr>
                        <td className='sm:p-2 font-semibold'>Faith Kings</td>
                        <td className='sm:p-2 font-semibold'>Female</td>
                        <td className='sm:p-2 font-semibold'>04 Apr</td>
                        <td className='sm:p-2 font-semibold'>Cholera</td>
                        <td className='sm:p-2 font-semibold'>Outpatient</td>
                    </tr>
                    <tr>
                        <td className='sm:p-2 font-semibold'>Stephen King</td>
                        <td className='sm:p-2 font-semibold'>Male</td>
                        <td className='sm:p-2 font-semibold'>04 Apr</td>
                        <td className='sm:p-2 font-semibold'>Typhoid</td>
                        <td className='p-2 font-semibold'>Inpatient</td>
                    </tr>
                    <tr>
                        <td className='sm:p-2 font-semibold'>Collins Wales</td>
                        <td className='sm:p-2 font-semibold'>Male</td>
                        <td className='sm:p-2 font-semibold'>05 Apr</td>
                        <td className='sm:p-2 font-semibold'>Leg Fracture</td>
                        <td className='sm:p-2 font-semibold'>Inpatient</td>
                    </tr>
                    <tr>
                        <td className='sm:p-2 font-semibold'>Moraa Jones</td>
                        <td className='sm:p-2 font-semibold'>Female</td>
                        <td className='sm:p-2 font-semibold'>05 Apr</td>
                        <td className='sm:p-2 font-semibold'>Fever</td>
                        <td className='sm:p-2 font-semibold'>Outpatient</td>
                    </tr>
                    <tr>
                        <td className='sm:p-2 font-semibold'>Richard Samuel</td>
                        <td className='sm:p-2 font-semibold'>Male</td>
                        <td className='sm:p-2 font-semibold'>05 Apr</td>
                        <td className='sm:p-2 font-semibold'>Tuberculosis</td>
                        <td className='sm:p-2 font-semibold'>Inpatient</td>
                    </tr>
                </table>
            </div>

            <div className='sm:w-1/3 p-5'>
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
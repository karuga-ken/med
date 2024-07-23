import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faCalendar, faClock, faBan} from '@fortawesome/free-solid-svg-icons';

function PatientDashboard() {
  return (
    <div className='bg-gray-100'>
    <div className='bg-oxford-blue text-white font-semibold text-xl flex p-4 '>
        <h1 className='w-10/12 ml-12' style={{letterSpacing:'5px'}}>MediPlus</h1>
        <h1 style={{letterSpacing:'5px'}}><FontAwesomeIcon icon={faUserTie} /> Packard</h1>
    </div>

    <div className='ml-12 mt-12'>
        <h1 className='text-oxford-blue text-4xl mb-2 font-semibold' style={{letterSpacing:'3px'}}> Welcome Packard,</h1>
        <p className='text-oxford-blue' style={{letterSpacing:'1px'}}>Stay Up to Date with your Medical Records...</p>
    </div>

    <div className='flex gap-5 mt-8 ml-12 mr-12'>
        <div className=' w-1/2 '>
            <div className='bg-oxford-blue shadow-xl rounded-md text-white p-5'>
                <div className='flex gap-4 '>
                    <h1 className='font-semibold pt-1 ' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1.5rem", color:'yellow' }}><FontAwesomeIcon icon={faCalendar}/></h1>
                    <p className='font-semibolds text-4xl'>20</p>
                </div>

                <div className='mt-5'>
                    <p style={{letterSpacing:'1px'}}>Total Number of Records</p>
                </div>
                </div>
            </div>

            <div className=' w-1/2'>
                <div className='bg-oxford-blue shadow-md rounded-md text-white p-5'>
                <div className='flex gap-4 '>
                    <h1 className='font-semibold pt-1 ' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1.5rem", color:'lime' }}><FontAwesomeIcon icon={faClock} /></h1>
                    <p className='font-semibolds text-4xl'>48</p>
                </div>

                <div className='mt-5'>
                    <p style={{letterSpacing:'1px'}}>Total Number of Pending Appointments</p>
                </div>
                </div>
            </div>

            <div className='w-1/2 '>
                <div className='bg-oxford-blue shadow-md rounded-md text-white p-5'>
                <div className='flex gap-4 '>
                    <h1 className='font-semibold pt-1 ' style={{ fontSize: window.innerWidth < 768 ? "1rem" : "1.5rem", color:'red' }}><FontAwesomeIcon icon={faBan} /></h1>
                    <p className='font-semibolds text-4xl'>37</p>
                </div>

                <div className='mt-5'>
                    <p style={{letterSpacing:'1px'}}>Total Number of Scheduled Appointments</p>
                </div>
                </div>
            </div>

    </div>

    <div className='m-12 flex gap-5 justify-center'>
        <input className='bg-gray-200 p-2 w-3/5 rounded-xl border-none' type='text' placeholder='Search For Patient...'></input>
        <button className='bg-mikado-yellow w-1/5 rounded-md font-semibold hover:bg-oxford-blue hover:text-white'>Search</button>
    </div>

    <div className='justify-center mt-12'>
        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

        <div className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Aga Khan Hospital</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>Dr. Karuga Mbugua</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>07/07/2024</h1>
            <button className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'>Download Record</button>
        </div>

       
    </div>

    

   
    </div>
  )
}

export default PatientDashboard
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faCalendar, faClock, faBan} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PatientDashboard() {

    const [records, setRecords] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRecords();
      }, []);
    
      const fetchRecords = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:4040/patrecords', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
            }
          });
          setRecords(response.data);
          setTotalRecords(response.data.length);
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      };
    
      const filteredRecords = records.filter(record =>
        record.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const downloadReport = async (recordId) => {
        try {
          const response = await axios.get(`http://127.0.0.1:4040/download_report/${recordId}`, {
            responseType: 'blob', // Important for handling file downloads
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
            }
          });
      
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `medical_record_${recordId}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading file:', error);
          // Handle error (e.g., show an error message to the user)
        }
      };


  return (
    <div className='bg-gray-100 h-screen'>
    <div className='bg-oxford-blue text-white font-semibold text-xl flex p-4 '>
        <h1 className='w-9/12 ml-12' style={{letterSpacing:'5px'}}>MediPlus</h1>
        {/* <h1 className='mr-2' style={{letterSpacing:'5px'}}><FontAwesomeIcon icon={faUserTie} /> Packard</h1> */}
        <Link to="/book">
          <button className=' ml-2 pl-2 pr-2 rounded-md hover:text-white hover:bg-blue-400'>Book Appointment</button>
        </Link>
        <button className='bg-red-600 ml-2 pl-2 pr-2 rounded-md hover:text-white hover:bg-oxford-blue'>LogOut</button>
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
                    <p className='font-semibolds text-4xl'>{totalRecords}</p>
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
        <input 
          className='bg-gray-200 p-2 w-3/5 rounded-xl border-none' 
          type='text' 
          placeholder='Search For Medical Record...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className='bg-mikado-yellow w-1/5 rounded-md font-semibold hover:bg-oxford-blue hover:text-white'>Search</button>
      </div>

    <div className='justify-center mt-12'>
        {filteredRecords.map((record) => (
          <div key={record.id} className='bg-white flex justify-center gap-10 mb-5 p-5 w-4/6 rounded-md shadow-xl font-semibold m-12 mx-auto'>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>{record.hospital_name}</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>{record.doctor_name}</h1>
            <h1 className='mr-5 ml-5 pt-2 pb-2'>{record.date}</h1>
            <button 
                onClick={() => record.has_file ? downloadReport(record.id) : null}
                className='mr-5 ml-5 p-2 bg-oxford-blue text-white rounded-md hover:bg-mikado-yellow'
                >
                {record.has_file ? 'Download Record' : 'No File'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientDashboard;
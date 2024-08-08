import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFileLines, faCalendar, faFolderOpen, faHeartPulse, faPerson, faUserTie, faRightFromBracket, faBell, faScissors} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const localizer = momentLocalizer(moment);

function Appointments() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:4040/patientappointments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        const appointments = response.data.appointments;
        const events = appointments.map(appointment => ({
          title: appointment.doctorName,
          start: new Date(appointment.start),
          end: new Date(appointment.end)
        }));
        setEvents(events);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  return (
    <div className='flex'>

            <div className='bg-oxford-blue  w-1/4 flex flex-col gap-5'>
                    <div className='flex-start justify-center p-4 pl-10 mb-10'>
                        <h1 className='w-9/12 font-bold text-white text-2xl' style={{letterSpacing:'8px'}}><FontAwesomeIcon className='' icon={faFolderOpen} /> MediPlus</h1>
                    </div>
                    <div className='flex-start justify-center p-4 text-white text-xl font-semibold h-screen'>
                        <ul className='flex flex-col gap-5 pl-5 '>
                            <Link to = "/doc">
                            <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faFolderOpen} /> Dashboard</li>
                            </Link>
                            <Link to = "/appointments">
                                <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faCalendarCheck} /> Appointments</li>
                            </Link>
                            <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><Link to="/patient-list"><FontAwesomeIcon className='' icon={faHeartPulse} /> Patients</Link></li>
                            
                            <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faFileLines} /> Reports</li>
                            <li className='mb-5 hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5 hover:cursor-pointer'><FontAwesomeIcon className='' icon={faUserTie} /> My Account</li>
                        </ul>
                    </div>

                    <div className='flex-start justify-center p-4 text-white text-xl font-semibold pl-10'>
                        <h1 className='hover:cursor-pointer  hover:text-mikado-yellow hover:border-l-mikado-yellow border-4 border-oxford-blue pl-5'><FontAwesomeIcon icon={faRightFromBracket} /> LogOut</h1>
                    </div>
                </div>
                 <div className='w-full h-screen m-5 p-12'>
                    <h1>Appointments</h1>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                      />
                    )}
                    {error && (
                      <p style={{ color: 'red' }}>{error}</p>
                    )}
                 </div>
      
    </div>
  );
}

export default Appointments;
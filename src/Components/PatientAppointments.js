import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';

const localizer = momentLocalizer(moment);

function PatientAppointments() {
  const [events, setEvents] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    // Fetch doctors from the backend
    fetch('http://127.0.0.1:4040/searchdoc', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched doctors:', data); // Log the doctors data
        setDoctors(data);
      })
      .catch(error => console.error('Error fetching doctors:', error));

    // Fetch existing appointments
    fetch('http://127.0.0.1:4040/getbookedappointments', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched appointments:', data); // Log the appointments data
        const eventsArray = data.appointments.map(appointment => ({
          title: `Appointment with Dr. ${appointment.doctorName}`,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
        }));
        setEvents(eventsArray);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const date = moment(slotInfo.start).format('YYYY-MM-DD');
    const time = moment(slotInfo.start).format('HH:mm');
    console.log('Selected slot:', { date, time }); // Log the selected date and time
    setSelectedDate(date);
    setSelectedTime(time);
    setShowModal(true);
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const appointmentData = {
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
    };

    console.log('Booking appointment data:', appointmentData); // Log the appointment data

    fetch('http://127.0.0.1:4040/addappointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Appointment booked:', data); // Log the response data
        setEvents([...events, data]);
        setShowModal(false);
        resetForm();
      })
      .catch(error => console.error('Error booking appointment:', error));
  };

  const resetForm = () => {
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setSearchTerm('');
  };

  const filteredDoctors = Array.isArray(doctors) 
    ? doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className='bg-oxford-blue text-white font-semibold text-xl flex p-4'>
        <h1 className='w-9/12 ml-12' style={{letterSpacing:'5px'}}>MediPlus</h1>
        <button className='bg-red-600 ml-2 pl-2 pr-2 rounded-md hover:text-white hover:bg-oxford-blue'>LogOut</button>
      </div>
      <div className='mt-5 ml-5 mr-5'>
        <h1>Manage Your Appointments</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Schedule an Appointment</h3>
            <form onSubmit={handleBookAppointment}>
              <input
                type="text"
                placeholder="Search for a doctor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="">Select a doctor</option>
                {filteredDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientAppointments;

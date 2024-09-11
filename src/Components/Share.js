import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import patient from "./Images/patient.png"

function Share() {
  return (
    <div className='bg-oxford-blue p-4 sm:flex gap-5 h-full'>
        <div className='sm:flex flex-col  sm:w-1/2 p-4 sm:pl-20 '>
            <div className='flex  p-4 gap-10 '>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faEnvelopeOpenText} /></p>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faShareFromSquare} /></p>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faCommentMedical} /></p>
            </div>

            <div className='flex justify-center p-4'>
                <p className='font-bold text-3xl  text-rose-taupe'>Share Your Medical Record Safely and Securely</p>
            </div>

            <div className='flex justify-center align-center p-4'>
                <p className='text-white font-light'>
                Share your medical record with anyone who needs it. Most of your healthcare providers can already get the
                information they need, but if they can't, you have the power to share your record on the spot.  
                </p>
            </div>

            <div className='flex-start p-4 justify-center align-center mt-5'>
                <button className='bg-rose-taupe text-white px-5 py-2 rounded-md hover:bg-opacity-10 backdrop-filter backdrop-blur-l'>Learn More</button>
            </div>
        </div>



        <div className='sm:w-1/2'>
            <img src={patient} />
        </div>
    </div>
  )
}

export default Share
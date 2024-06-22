import React from 'react'
import chart from './Images/chart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faNotesMedical, faPills, faSyringe} from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <div className='bg-skobeloff sm:flex sm:justify-center align-center gap-5 p-4'>
        <div className='sm:flex sm:justify-center align-center p-4 lg:w-1/2'>
            <img src={chart} />
        </div>

        <div className=''>
            <div className='flex justify-center  gap-10 p-4  mt-20'>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faHospital} /></p>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faPills} /></p>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faNotesMedical} /></p>
            <p style={{ fontSize: window.innerWidth < 768 ? "1rem" : "3rem", color: "#ffff" }}><FontAwesomeIcon icon={faSyringe} /></p>
            </div>

            <div className='p-4 flex-start justify-center'>
                <h1 className='font-bold text-3xl'>All your health information<br/> in one place</h1>
            </div>

            <div className='p-4 font-light text-white flex-start justify-center'>
                See your medications, test results, upcoming appointments,<br/> medical bills,
                price estimates, and more all in one place,<br/> even 
                if you've been seen at multiple healthcare organizations. 
            </div>

            <div className='flex justify-center align-center mt-5'>
                <button className='bg-oxford-blue text-white px-5 py-2 rounded-md hover:bg-opacity-10 backdrop-filter backdrop-blur-l'>Learn More</button>
            </div>
        </div>
    </div>
  )
}

export default About
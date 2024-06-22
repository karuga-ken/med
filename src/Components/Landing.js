import React from 'react'
import doctor from './Images/doctor.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen} from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div className='relative sm:h-screen'>
        <img className='w-full max-h-screen' src={doctor} />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-skobeloff font-bold sm:text-6xl bg-opacity-10 backdrop-filter backdrop-blur-sm sm:py-10 sm:px-10 flex justify-center'>
        <h1 className='' style={{letterSpacing:'8px'}}><FontAwesomeIcon className='' icon={faFolderOpen} />MediHub Plus<br/> 
        <span className='sm:text-3xl px-6'>Your Health Companion</span><br/> </h1>
        </div>
        
    </div>
  )
}

export default Landing
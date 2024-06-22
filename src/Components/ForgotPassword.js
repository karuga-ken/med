import React from 'react'
import { Link } from 'react-router-dom'
import FooterSignup from './FooterSignup'

function ForgotPassword() {
  return (
    <>
     <div className='border-t border-navy-blue mt-0 p-5 flex flex-col align-center justify-center'>
        <div>
            <h3 className='text-navy-blue text-3xl font-bold flex align-center justify-center mb-5'>Forgot Password</h3>
            
        </div>

        <div className='border-2 sm:mx-auto p-4 m-5 flex flex-col'>
        
        <div className='flex flex-col align-center justify-center text-center  mt-5'>
            <h3 className='text-2xl text-gray-400 mb-5'>Enter your email and we will send a reset link</h3>
            
        </div>
        <div className='flex flex-col sm:mx-64'>
            <input type='email' required placeholder='email@example.com' className='text-center mb-5 border border-gold p-2 sm:px-40'/>
        </div>
        </div>
        <button type='submit' required className='bg-blue-500 mx-auto hover:bg-gold mb-5 px-12 py-2 text-white text-xl'><Link to='/doc'>SUBMIT</Link></button>
        <p className='flex flex-row gap-1 justify-center mb-5'>Not a member? <Link to="/signup"><span className='text-navy-blue font-semibold'>Create an Account</span></Link></p>
        <p className='flex flex-row gap-1 justify-center mb-10'>Already a member? <Link to="/sign-in"><span className='text-navy-blue font-semibold'>Sign In</span></Link></p>
    </div>
    <FooterSignup/>
    </>
  )
}

export default ForgotPassword
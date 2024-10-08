import React, { useEffect } from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import FooterSignup from './FooterSignup'
import { useNavigate } from 'react-router-dom'


function Signup() {
  const [name,  setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check if all fields are provided
    if (name && email && password){
      try{
        const response = await fetch('http://127.0.0.1:4040/auth/registerdoctors', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password})
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration Failed')
        }
        const responseData = await response.json();
        const accessToken = responseData.accessToken
        localStorage.setItem('access_token', accessToken)
        alert ('registration successful')
        navigate('/doc')
      }
      catch (error){
        alert(error.message)
      }
    }
  }
  
  return (
    <div>
        <div className=' mt-0 p-5 h-screen flex flex-col align-center justify-center bg-gradient-to-b from-white to-oxford-blue bg-opacity-10 backdrop-filter backdrop-blur-sm'>
        <div>
            <h3 className='text-navy-blue text-3xl font-bold flex align-center justify-center mb-5'>Create Your Doctor's Account</h3>
            <p className='mb-5 flex align-center justify-center'>Have Your Medical Records Anywhere you Go</p>
            <p className='flex align-center justify-center'>Have an Account? <Link to = "/sign-in"><span className='text-navy-blue ml-1 font-bold'>Log in</span></Link></p>
        </div>
        <div className='flex flex-col align-center justify-center text-center  mt-5'>
            {/* <h3 className='text-2xl text-gray-400 mb-5'>Sign up with</h3> */}
            <Link to='/patient-access'>
              <button className='border-none shadow-xl mb-4 mx-auto p-2 w-60 bg-red-600 text-white'>Access Patient Portal</button>
            </Link>
            
            {/* <button className=' border-none shadow-xl mx-auto p-2 w-60 bg-blue-600 mb-5 text-white'>Continue with X</button> */}
            <h3 className='text-2xl text-gray-500 mb-5'>or</h3>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col sm:mx-64 '>
        {/* <input type='text' required placeholder='Enter Your National ID' className='text-center mx-12 mb-5 border bg-transparent font-bold placeholder-white border-gray-400 p-2'/>  */}
            <input type='text' required placeholder='Enter Your Name' value = {name} onChange={(e) =>  setName(e.target.value)} className='text-center mx-12 mb-5 border bg-transparent font-bold placeholder-white border-gray-400 p-2'/> 
            <input type='email' required placeholder='Email Address' value = {email} onChange={(e) =>  setEmail(e.target.value)} className='text-center mx-12 mb-5  border bg-transparent font-bold placeholder-white border-gray-400 p-2'/> 
            {/* <input type='text' required placeholder='Phone Number' className='text-center mx-12 mb-5  border bg-transparent font-bold placeholder-white border-gray-400 p-2'/> */}
            <input type='password' required placeholder='Password' value = {password} onChange={(e) =>  setPassword(e.target.value)} className='text-center mx-12 mb-5  border bg-transparent font-bold placeholder-white border-gray-400 p-2'/>
            <input type='password' required placeholder='Confirm Password' className='text-center mx-12 mb-5  border bg-transparent font-bold placeholder-white border-gray-400 p-2'/>
            <button type='submit' required className='bg-blue-500 mx-12 hover:bg-gold mb-20 p-2 text-white text-xl'>REGISTER</button>
        </form>
    </div>
    <FooterSignup/>
    </div>
  )
}

export default Signup
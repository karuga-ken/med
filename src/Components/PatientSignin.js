import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function PatientSignin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && password){
      try{
        const response = await fetch('http://127.0.0.1:4040/auth/login', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password})
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login Failed')
        }

        const responseData = await response.json();
        const accessToken = responseData.accessToken
        localStorage.setItem('access_token', accessToken)
        alert('log in successful')
        navigate('/doc')
      }
      catch (error){
        alert(error.message)
      }
    }
  }
  return (
    <>
     <div className=' mt-0 p-5 h-screen flex flex-col align-center justify-center bg-gradient-to-b from-white to-oxford-blue'>
        <div>
            <h3 className='text-navy-blue text-3xl font-bold flex align-center justify-center mb-5'>Log in to your account</h3>
            
        </div>
        <div className='flex flex-col align-center justify-center text-center  mt-5'>
            {/* <h3 className='text-2xl text-gray-400 mb-5'>Sign in with</h3> */}
            <button className='border-none shadow-xl mb-4 mx-auto p-2 w-60 bg-red-600 text-white'>Continue with Google</button>
            <button className=' border-none shadow-xl mx-auto p-2 w-60 bg-blue-600 mb-5 text-white'>Continue with X</button>
            <h3 className='text-2xl text-gray-500 mb-5'>or</h3>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col sm:mx-64 '>
            <input type='email' required placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} className='text-center mx-64 mb-5  border bg-transparent font-bold placeholder-white border-gray-400 p-2'/>
            <input type='password' required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='text-center mx-64 mb-5  border bg-transparent font-bold placeholder-white border-gray-400 p-2'/>
            <button type='submit' required className='bg-blue-500 mx-64 hover:bg-gold mb-5 p-2 text-white text-xl'>LOGIN</button>
            <p className='flex justify-center mb-20 font-bold text-xl'><Link to ="/forgot-password">Forgot Password?</Link> </p>
        </form>
    </div>
    </>
  )
}

export default PatientSignin
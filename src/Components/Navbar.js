import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-oxford-blue p-4 sticky absolute'>
        <ul className='text-white flex'>
            <li className='w-9/12 font-bold text-2xl' style={{letterSpacing:'8px'}}><Link to='/'>MediHub</Link></li>
            <Link to='/access-records'>
            <li className='font-semibold sm:text-2xl bg-white text-oxford-blue px-4 rounded cursor-pointer hover:bg-melon '>
                Access Your Records
            </li>
            </Link>

        </ul>
    </div>
  )
}

export default Navbar
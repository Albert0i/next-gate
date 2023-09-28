"use client"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MongoDB2MySQL } from '@/server-actions/actions'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Main = () => {
    const [direction, setDirection] = useState('goRight')
    const handleArrowClick = () => {
      if (direction==='goRight') 
        setDirection('goLeft')
      else
        setDirection('goRight')
    }
    const handleClick = () => {
        MongoDB2MySQL('users', 'users')
        .then(data => toast.success('success'))
        .catch(err => console.log(err))
      }
    return (        
        <div className='flex flex-col items-center justify-center h-1/2'>
          
          <div className='flex flex-row items-center gap-4 mt-4 justify-self-stretch'>
              <span className='w-24 font-bold text-right'>MySQL</span>
              <span className='w-12'></span>
              <span className='w-24 font-bold text-left'>MongoDB</span>
          </div>

          <div className='flex flex-row items-center justify-between gap-4 mt-4'>
            <input type='text' placeholder='table' className='w-24 p-2' autoFocus></input>
              { direction === 'goLeft' && 
                <FaArrowLeft className='w-12 text-2xl hover:text-gray-500' onClick={handleArrowClick} /> }
              { direction === 'goRight' && 
                <FaArrowRight className='w-12 text-2xl hover:text-gray-500' onClick={handleArrowClick} /> }
            <input type='text' placeholder='collection' className='w-24 p-2'></input>
          </div>
          
          <div>
            <button className='w-auto px-8 py-2 mt-4 font-bold text-white uppercase bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400' onClick={handleClick}>go</button>
          </div>

          <div>
            <Toaster position="bottom-center" reverseOrder={true} />
          </div>
        </div>
    )
}

export default Main
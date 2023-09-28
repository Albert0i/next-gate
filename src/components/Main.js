"use client"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { M2M } from '@/server-actions/actions'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Main = () => {
    const [direction, setDirection] = useState('MySQL')
    const [table, setTable] = useState('users')
    const [collection, setCollection] = useState('users')

    const handleArrowClick = () => {
      if (direction==='MySQL') 
        setDirection('MongoDB')
      else
        setDirection('MySQL')
    }
    const handleClick = () => {
      M2M(direction, table, collection)
        .then(result => console.log(result))
        .catch(err => console.log(err))
      }
    return (        
        <div className='flex flex-col items-center justify-center h-2/3'>
          
          <div className='flex flex-row items-center gap-4 mt-4 justify-self-stretch'>
              <span className='w-24 font-bold text-right'>MySQL</span>
              <span className='w-12'></span>
              <span className='w-24 font-bold text-left'>MongoDB</span>
          </div>

          <div className='flex flex-row items-center justify-between gap-4 mt-4'>
            <input type='text' placeholder='table' className='w-24 p-2' autoFocus 
              onChange={ e => setTable(e.target.value) } defaultValue={table} />
              { direction === 'MongoDB' && 
                <FaArrowLeft className='w-12 text-2xl hover:text-gray-500' onClick={handleArrowClick} /> }
              { direction === 'MySQL' && 
                <FaArrowRight className='w-12 text-2xl hover:text-gray-500' onClick={handleArrowClick} /> }
            <input type='text' placeholder='collection' className='w-24 p-2' 
              onChange={ e => setCollection(e.target.value) } defaultValue={collection} />
          </div>
          
          <div>
            <button className='w-auto px-8 py-2 mt-8 font-bold text-white uppercase bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400' onClick={handleClick}>go</button>
          </div>

          <div>
            <Toaster position="bottom-center" reverseOrder={true} />
          </div>
        </div>
    )
}

export default Main
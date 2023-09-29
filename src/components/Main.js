"use client"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { M2M, Mdelete } from '@/server-actions/actions'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Main = () => {
    const [direction, setDirection] = useState('MySQL')
    const [erase, setErase] = useState(true)
    const [table, setTable] = useState('users')
    const [collection, setCollection] = useState('users')
    const [disable, setDisable] = useState(false)

    useEffect(()=>{
      if (table.trim()!=='' && collection.trim()!=='')
        setDisable(false)
      else 
        setDisable(true)
    }, [table, collection])

    const handleArrowClick = () => {
      if (direction==='MySQL') 
        setDirection('MongoDB')
      else
        setDirection('MySQL')
    }   
    
    const handleGoClick = async () => {      
      setDisable(true)
      try {
        if (erase) {
          const resultErase = await Mdelete(direction, table, collection)
          //console.log('resultErase=', resultErase)
          if (! resultErase.success) {
            console.log(resultErase)
            toast.error('Failed')            
            return 
          }  
        }

        const resultCopy = await M2M(direction, table, collection)
        //console.log('resultCopy=', resultCopy)        
        if (resultCopy.success) {
          const count = resultCopy.result.insertedCount || resultCopy.result[0]?.affectedRows          
          toast.success(`Success (${count})`)
        }          
        else {
          console.log(resultCopy)
          toast.error('Failed')
        }          
      } catch(error) {
        console.log(error)
      } finally {
        setDisable(false)
      }
    }
    
    return (        
        <main className='flex flex-col items-center justify-center h-4/6'>
          
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
          
          <div className='flex gap-2 mt-4'>
            <input id='erase' type='checkbox' 
            checked={erase ? 'checked':''} onChange={ () => setErase(! erase) }></input>
            <label htmlFor='erase' className='text-sm capitalize'>erase target</label>
          </div>

          <div>
            <button className='w-32 px-8 py-2 mt-8 font-bold text-white uppercase bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed' 
            onClick={handleGoClick} disabled={ disable?'disabled':'' }>go</button>
          </div>

          <div>
            <Toaster position="bottom-center" reverseOrder={true} />
          </div>
        </main>
    )
}

export default Main
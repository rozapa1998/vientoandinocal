import React from 'react'
import GastosTable from '../GastosTable'

const Gastos = () => {
  return (
    <>
    <h2 className='text-white'>Gastos</h2>
    <div className='container'>
       <div className='row'>
         <div className='col-12 col-sm-12'>
         <GastosTable/>
         </div>
       </div>
    </div>
    
    </>
  )
}

export default Gastos
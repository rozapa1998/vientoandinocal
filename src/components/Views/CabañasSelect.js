import React from 'react'
import CardRedirect from '../Cabañas/CardRedirect'

const CabañasSelect = () => {
    
    //Array de Cabañas
    const cabañas = [
    {nombre:"Cabaña 1", id:"cabana1"},
    {nombre:"Cabaña 2", id:"cabana2"},
    {nombre:"Cabaña 3", id:"cabana3"},
    {nombre:"Cabaña 4", id:"cabana4"},
    {nombre:"Cabaña 5", id:"cabana5"},
    {nombre:"Cabaña 6", id:"cabana6"},
    {nombre:"Cabaña 7", id:"cabana7"},
    {nombre:"Cabaña 8", id:"cabana8"},
    {nombre:"Cabaña 9", id:"cabana9"},
    {nombre:"Cabaña 10", id:"cabana10"}]
    
    return (
    <>
    <h2 className='text-white'>Seleccione Cabaña</h2>
    <div className='container'>
        <div className='row'>
            {
                cabañas.map(cabaña=>{
                    return(
                        <CardRedirect
                        key={cabaña.id}
                        cabana={cabaña.nombre}
                        id={cabaña.id}/>
                    )
                })
            }
        
        </div>
    </div>
    
    </>
  )
}

export default CabañasSelect
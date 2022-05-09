import React, {useState,useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Formulario from '../../Formulario'
import { db } from "../../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore/lite"
import TodasReservas from '../../TodasReservas'

const Cabaña10 = () => {
   
  const [Db, setDb] = useState([])

    //Llamada BD y posterior arisgancion de useState
  async function getEventos(){
    const eventosCol = collection(db, "Cabaña10");
    const eventosSnapshot = await getDocs(eventosCol);
    const eventosList = eventosSnapshot.docs.map(doc => doc.data())
    setDb(eventosList)
  }

  useEffect(() => {
    getEventos()
  }, [Db])
  
  return (
    <>
        <h2 className='text-white pb-4'>Cabaña 10 <span className="badge rounded-pill bg-cab10">*</span></h2>
        <div className='container'>
            <div className='row'>
            <div className='bg-light text-center col-12'>
             <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={Db}
            />
             </div>
            </div>
        </div>
        
        <Formulario
        nombreCabana={" - Cabaña 10"}
        capacidad={2}
        color={"navy"}
        nombreDB={"Cabaña10"}/>
        <TodasReservas
        nombreCabaña={"Cabaña10"}
        nombreCabanaB={"Cabaña 10"}
        Db={Db}
        />
    </>
    
  )
}

export default Cabaña10
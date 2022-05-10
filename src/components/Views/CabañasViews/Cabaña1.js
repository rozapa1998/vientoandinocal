import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Formulario from '../../Formulario'
import { db } from "../../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore/lite"
import TodasReservas from '../../TodasReservas'

const Cabaña1 = () => {
  
  const [Db, setDb] = useState([])

    //Llamada BD y posterior arisgancion de useState
  console.log(window.location)
  async function getEventos(){
    const eventosCol = collection(db, "Cabaña1");
    const eventosSnapshot = await getDocs(eventosCol);
    const eventosList = eventosSnapshot.docs.map(doc => doc.data())
    setDb(eventosList)
  }

  useEffect(() => {
    getEventos()
  }, [])
  
  
  return (
    <>
        <h2 className='text-white pb-4'>Cabaña 1 <span className="badge rounded-pill bg-primary">*</span></h2>
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
        nombreCabana={" - Cabaña 1"}
        capacidad={2}
        color={"blue"}
        nombreDB={"Cabaña1"}
        />
        
        <TodasReservas
        nombreCabaña={"Cabaña1"}
        nombreCabanaB={"Cabaña 1"}
        Db={Db}
        />
    </>
    
  )
}

export default Cabaña1
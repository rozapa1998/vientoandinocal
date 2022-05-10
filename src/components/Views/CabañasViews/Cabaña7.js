import React,{useEffect,useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Formulario from '../../Formulario'
import { db } from "../../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore/lite"
import TodasReservas from '../../TodasReservas'

const Cabaña7 = () => {
   
  const [Db, setDb] = useState([])

    //Llamada BD y posterior arisgancion de useState
  async function getEventos(){
    const eventosCol = collection(db, "Cabaña7");
    const eventosSnapshot = await getDocs(eventosCol);
    const eventosList = eventosSnapshot.docs.map(doc => doc.data())
    setDb(eventosList)
  }

  useEffect(() => {
    getEventos()
  }, [])
  
  return (
    <>
        <h2 className='text-white pb-4'>Cabaña 7 <span className="badge rounded-pill bg-cab7">*</span></h2>
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
        nombreCabana={" - Cabaña 7"}
        capacidad={5}
        color={"deeppink"}
        nombreDB={"Cabaña7"}/>

        <TodasReservas
        nombreCabaña={"Cabaña7"}
        nombreCabanaB={"Cabaña 7"}
        Db={Db}
        />
    </>
    
  )
}

export default Cabaña7
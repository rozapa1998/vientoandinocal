import React,{useState,useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Formulario from '../../Formulario'
import { db } from "../../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore/lite"
import TodasReservas from '../../TodasReservas'

const Cabaña8 = () => {
   
  const [Db, setDb] = useState([])

  //Llamada BD y posterior arisgancion de useState
  async function getEventos(){
    const DB = []
    const eventosCol = collection(db, "Cabaña8");
    const eventosColG = collection(db, "reservas")
    const eventosSnapshotG = await getDocs(eventosColG);
    const eventosSnapshot = await getDocs(eventosCol);
    eventosSnapshot.forEach((doc)=>{
      DB.push({...doc.data(), id:doc.id})
    })
    for (let index = 0; index < DB.length; index++) {
      eventosSnapshotG.forEach((doc)=>{
        DB[index].idG = doc.id
        DB[index].idB = index
      })
    }
    setDb(DB)
  }

useEffect(() => {
  getEventos()
},[])
  
  return (
    <>
        <h2 className='text-white pb-4'>Cabaña 8  <span className="badge rounded-pill bg-cab8">*</span></h2>
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
        nombreCabana={" - Cabaña 8"}
        capacidad={7}
        color={"indigo"}
        nombreDB={"Cabaña8"}/>
        <TodasReservas
        nombreCabaña={"Cabaña8"}
        nombreCabanaB={"Cabaña 8"}
        Db={Db}
        />
    </>
    
  )
}

export default Cabaña8
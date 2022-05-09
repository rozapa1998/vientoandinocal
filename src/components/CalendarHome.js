import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { db } from "../firebase/firebase"
import { collection, getDocs } from "firebase/firestore/lite"

const CalendarHome = () => {
    
    const [Db, setDb] = useState([])

    //Llamada BD y posterior arisgancion de useState
  async function getEventos(){
    const eventosCol = collection(db, "reservas");
    const eventosSnapshot = await getDocs(eventosCol);
    const eventosList = eventosSnapshot.docs.map(doc => doc.data())
    setDb(eventosList)
  }

  useEffect(() => {
    getEventos()
    console.log(Db)
  }, [Db])
  

    return (
     <div className="container mb-5">
         <div className='row'>
             <div className='bg-light text-center col-12'>
             <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={Db}/>
             </div>
         </div>
     </div>
)
}

export default CalendarHome
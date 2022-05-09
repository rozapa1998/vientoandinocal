import React, {useState, useEffect} from 'react'
import { db } from '../firebase/firebase'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite"

const TodasReservas = ({nombreCabaña, nombreCabañaB}) => {
    
    const [Db, setDb] = useState([])
    const [Busq, setBusq] = useState("")
    const [ResultadoB, setResultadoB] = useState("Busca...")

    
  
  useEffect(() => {
    getEventos()
  },[Db])

  //Funcion busqueda
  function BusquedaR () {
    const label = document.getElementById("busquedares").value
    const busqueda = Db.filter(e=>e.title === (label + " - " + nombreCabañaB))
    console.log(busqueda)
    setResultadoB(busqueda)
  }

  //Llamada BD y posterior arisgancion de useState
  async function getEventos(){
    const DB = []
    const eventosCol = collection(db, nombreCabaña);
    const eventosColG = collection(db, "reservas")
    const eventosSnapshotG = await getDocs(eventosColG);
    const eventosSnapshot = await getDocs(eventosCol);
    eventosSnapshot.forEach((doc)=>{
      DB.push({...doc.data(), id:doc.id})
    })
    for (let index = 0; index < DB.length; index++) {
      eventosSnapshotG.forEach((doc)=>{
        DB[index].idG = doc.id
      })
    }
    setDb(DB)
  }

  //Eliminar Reserva de idG y id
  async function EliminarReserva (id, idG) {
    await deleteDoc(doc(db, nombreCabaña, id))
    EliminarReservaG(idG)
    let alerta = document.getElementById("alertB")
        alerta.innerHTML=(`
        <div class="alert alert-success" role="alert">
        El registro se <strong>elimino</strong> correctamente
        </div>`)
        setTimeout(() => {
            alerta.innerHTML=("")
            window.location.reload()
        }, 2500);
  }
  async function EliminarReservaG (idG){
    await deleteDoc(doc(db, "reservas", idG))
  }

    return (
    <>
    <div className='container mt-4'>
        <div className='row'>
            <div className='col-12'>
                <h2 className='text-white'>Todas las Reservas</h2>
                <div id='alertB' className='position-relative'></div>
                <div className='col-12'>
                <div className="alert alert-light alert-dismissible fade show table-responsive" role="alert">
                <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titular</th>
                            <th scope="col">C/P</th>
                            <th scope="col">Seña</th>
                            <th scope="col">Adeuda</th>
                            <th scope="col">Total</th>
                            <th scope="col">Borrar</th>
                          </tr>
                        </thead>
                    {Db.map((e)=>(   
                        <tbody key={e.id}>
                          <tr>
                            <th scope="row">{e.id}</th>
                            <td>{e.title}</td>
                            <td>{e.CantPersonas}</td>
                            <td>$ {e.seña}</td>
                            <td>$ {e.adeuda}</td>
                            <td>$ {e.total}</td>
                            <td><button type="button" className="btn-danger btn" onClick={()=>EliminarReserva(e.id, e.idG)}>Borrar</button></td>
                          </tr>
                        </tbody>
                      
                    )) 
                    }
                    </table>
                </div>
                </div>
                
            </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-sm-12'>
              <h4 className='text-white mt-4'>Busqueda</h4>
            </div>
            <input type="text" id='busquedares' className='form-control' placeholder="Ej: Carlos Juarez" value={Busq} onChange={e => setBusq(e.target.value)}></input>
            <div className='card col-12 col-sm-12 mt-3'>
              <p className='text-center'>{ResultadoB}</p>
            </div>
            <div className='col-12 text-center col-sm-12 mt-3'>
            <button className='btn btn-primary' onClick={BusquedaR}>Buscar</button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default TodasReservas
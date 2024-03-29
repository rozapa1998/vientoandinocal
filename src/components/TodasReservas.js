import React, { useState } from 'react'
import { db } from '../firebase/firebase'
import { deleteDoc, doc } from "firebase/firestore/lite"

const TodasReservas = ({nombreCabaña, nombreCabañaB, Db}) => {
    
    const [Busq, setBusq] = useState("")
    const [ResultadoB, setResultadoB] = useState(["Buscar..."])

  //Funcion busqueda
  function BusquedaR () {
    console.log(Db)
    const busqueda = Db.filter(e=>e.start === Busq + "T12:00:00")
    setResultadoB(busqueda) 
  }

  function BorrarDatos (id, idG) {
    EliminarReservaG(idG)
    EliminarReserva(id)
  setTimeout(function () {window.location.href = "https://vientoandinocalendario.netlify.app/"}, 2000);
}

  //Eliminar Reserva de idG y id
  async function EliminarReserva (id) {
    await deleteDoc(doc(db, nombreCabaña, id))
    let alerta = document.getElementById("alertB")
        alerta.innerHTML=(`
        <div class="alert alert-success" role="alert">
        El registro se <strong>elimino</strong> correctamente
        </div>`)
  }

  function EliminarReservaG (idG){
    deleteDoc(doc(db, "reservas", idG))
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
                            <th scope="row">{e.idB}</th>
                            <td>{e.title}</td>
                            <td>{e.CantPersonas}</td>
                            <td>$ {e.seña}</td>
                            <td>$ {e.adeuda}</td>
                            <td>$ {e.total}</td>
                            <td><button type="button" className="btn-danger btn" onClick={()=>BorrarDatos(e.id, e.idG)}>Borrar</button></td>
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
            <input type="date" id='busquedares' className='form-control' placeholder="Ej: Carlos Juarez" value={Busq} onChange={e => setBusq(e.target.value)}></input>
            <div className='card col-12 col-sm-12 mt-3'>
              <p className='text-center'>{ResultadoB.map((e)=>(
                <p><strong>Titular: </strong>{e.title} - <strong>C/Personas: </strong>{e.CantPersonas} - <strong>Seña: </strong>{e.seña} - <strong>Adeuda: </strong>{e.adeuda} - <strong>Total: </strong> {e.total} - <strong>Observaciones: </strong> -</p>
              ))}</p>
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
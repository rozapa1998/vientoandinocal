import React, {useState, useEffect} from 'react'
import { db } from '../firebase/firebase'
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore/lite"

const GastosTable = () => {
  
  const [Db, setDb] = useState([])

    //Llamada BD y posterior arisgancion de useState
  async function getEventos(){
    const DB = []
    const eventosCol = collection(db, "gastos");
    const eventosSnapshot = await getDocs(eventosCol);
    eventosSnapshot.forEach((doc)=>{
      DB.push({...doc.data(), id:doc.id})
    })
    setDb(DB)
  }

  useEffect(() => {
    getEventos()
  },[])
  
  //Eliminar Gasto
  async function EliminarReserva (id) {
    await deleteDoc(doc(db, "gastos", id))
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

  //Nuevo Gasto
  async function NuevoGasto (e) {
    e.preventDefault()
    //Captando Ids
    let Nombre = document.getElementById("NombreG").value
    let Date = document.getElementById("Date").value
    let Gasto = Number(document.getElementById("Gasto").value)

    //Guardando en BD
    const docRef = await addDoc(collection(db, "gastos"),{
      nombre: Nombre,
      fecha: Date,
      gasto: Gasto
    })
    console.log(docRef)        
        setTimeout(() => {    
            window.location.reload()
        }, 2000);
  }

  let TotalCalculado = Db.reduce((acc,item)=>{return acc + item.gasto},0)

  return (
    <>
    <div className='table-responsive'>
    <table className="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Fecha</th>
      <th scope="col">Gasto</th>
      <th scope="col">Eliminar</th>
    </tr>
  </thead>
  {Db.map((e)=>(
      <tbody key={e.id}>
      <tr>
        <th scope="row">{(e.id).substring(0, 4)}</th>
        <td>{e.nombre}</td>
        <td>{e.fecha}</td>
        <td>$ {e.gasto}</td>
        <td><button type="button" className="btn-danger btn" onClick={()=>EliminarReserva(e.id)}>Borrar</button></td>
      </tr>
    </tbody>
  ))
  }
  <h4><strong>Total = </strong>$ {TotalCalculado}</h4>
  
</table>
    </div>
  <div className='container'>
    <div className='row'>
      <div className='col-12 col-sm-12'>
      <form>
    <h3 className='text-white'>Formulario Gasto</h3>
    <div className='position-relative' id='alertaG'></div>
    <div className='row'>
    <div className="mb-3 col-12 col-sm-4">
      <label className="form-label text-white">Nombre</label>
      <input type="text" id="NombreG" className="form-control" placeholder="Ej: Limpieza"></input>
    </div>
    <div className="mb-3 col-12 col-sm-4">
      <label className="form-label text-white">Fecha</label>
      <input type="date" id="Date" className="form-control" placeholder="Ej: Limpieza"></input>
    </div>
    <div className="mb-3 col-12 col-sm-4">
      <label className="form-label text-white">Gasto</label>
      <input type="number" id="Gasto" className="form-control" placeholder="Ej: $15000"></input>
    </div>
    </div>
    <button type="submit" className="btn btn-primary" onClick={NuevoGasto}>Enviar</button>
</form>
      </div>
    </div>
  </div>
    </>
  )
}

export default GastosTable
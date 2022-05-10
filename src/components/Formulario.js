import React, {useState} from 'react'
import { db } from "../firebase/firebase"
import { collection, addDoc } from "firebase/firestore/lite"

const Formulario = ({nombreCabana, capacidad, color, nombreDB}) => {
  
    //Variables
    const [Total, setTotal] = useState("")
    const [CDias, setCDias] = useState(0)
    const [CPersonas, setCPersonas] = useState("")
    const [XNoche, setXNoche] = useState ("")

    //Handler XNoche y calculo
    const handleTotal = (e) =>{
        e.preventDefault()
        let valor = XNoche*CDias
        setTotal(valor)
    }
    
    //Chequeo Cantidad de Personas
    if(CPersonas > capacidad){
        let alerta = document.getElementById("alertP")
        alerta.innerHTML = (`
        <div class="alert alert-danger" role="alert">
        Capacidad de <strong>personas</strong> excedida
        </div>`)
        setTimeout(() => {
            alerta.innerHTML=("")
        }, 2500);
    }

    //Generacion Nueva Reserva
    async function NuevaReserva (e) {
        e.preventDefault()
        //Variables para el objeto de reservas
        let NombreTitutlar = document.getElementById("NombreTitular").value
        let CantPersonas   = document.getElementById("CPersonas").value
        let TDesayuno      = document.getElementById("TDesayuno").value
        let Start          = document.getElementById("CheckInDate").value + "T12:00:00"
        let End            = document.getElementById("CheckOutDate").value + "T11:00:00"
        let Reserva        = document.getElementById("Reserva").value
        let Adeuda         = document.getElementById("Adeuda").value
        let Total          = document.getElementById("Total").value
        let Observaciones  = document.getElementById("Observaciones").value

        //Guardado en collection CabañaX
        const docRef = await addDoc(collection(db, nombreDB),{
            title: NombreTitutlar+nombreCabana ,
            CantPersonas: CantPersonas,
            TipoDesayuno: TDesayuno,
            start: Start,
            end: End,
            reserva: Reserva,
            adeuda: Adeuda,
            total: Total,
            observaciones: Observaciones,
            color: color
        }
        )

        //Guardado en collection reservas
        const docRefGeneral = await addDoc(collection(db, "reservas"),{ 
            title: NombreTitutlar+nombreCabana ,
            CantPersonas: CantPersonas,
            TipoDesayuno: TDesayuno,
            start: Start,
            end: End,
            reserva: Reserva,
            adeuda: Adeuda,
            total: Total,
            observaciones: Observaciones,
            color: color
        })

        console.log(docRef)
        console.log(docRefGeneral)
        let alerta = document.getElementById("alertS")
        alerta.innerHTML=(`
        <div class="alert alert-success" role="alert">
        Tu reserva fue guardada con exito
        </div>`)
        setTimeout(function () {window.location.href = "https://master--benevolent-praline-6165ec.netlify.app/"}, 2000);
        
    }

    //Calculo de Fecha
    const CalculoFecha = () =>{
        let fechaini = new Date(document.getElementById('CheckInDate').value);
         let fechafin = new Date(document.getElementById('CheckOutDate').value);
         let diasdif= fechafin.getTime()-fechaini.getTime();
         let contdias = Math.round(diasdif/(1000*60*60*24));
         setCDias(contdias);
    }

    return (
    <div className='Formulario'>
        <div className='container pt-5'>
        
            <div className='row'>
            <form>
                <fieldset>
                    <legend className='color-font'>Formulario de reservas</legend>
                    <div className='row'>
                        <div className="mb-3 col-12 col-sm-6">
                        <label className="form-label color-font">Nombre del Titular</label>
                        <input type="text" id="NombreTitular" className="form-control" placeholder="Ej: Carlos Suarez"></input>
                        </div>
                        <div className="mb-3 col-6 col-sm-2">
                        <label className="form-label color-font">C/Personas</label>
                        <div id='alertP' className='relative'></div>
                        <input type="text" id="CPersonas" className="form-control" placeholder="Ej: 4" value={CPersonas} onChange={e => setCPersonas(e.target.value)}></input>
                        </div>
                        <div className="mb-3 col-6 col-sm-4">
                        <label className="form-label color-font">Tipo Desayuno</label>
                        <select id="TDesayuno" className="form-select">
                            <option>Desayuno</option>
                            <option>Desayuno seco</option>
                            <option>Sin desayuno</option>
                        </select>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="mb-3 col-12 col-sm-5">
                        <label className="form-label color-font">Fecha de Check In</label>
                            <input type="date" id="CheckInDate" className="form-control" placeholder="Disabled input"></input>
                        </div>
                        <div className="mb-3 col-12 col-sm-5">
                        <label className="form-label color-font">Fecha de Check Out</label>
                            <input type="date" id="CheckOutDate" className="form-control" placeholder="Disabled input" onChange={CalculoFecha}></input>
                        </div>
                        <div className="mb-3 col-12 col-sm-2">
                        <label className="form-label color-font">C/Dias</label>
                            <p type="number" id="Dias" className="form-control" placeholder="Ej: 1">{CDias}</p>
                        </div>
                    </div>

                    <div className='row'>
                    <div className="mb-3 col-6 col-sm-3 ">
                        <label className="form-label color-font">$ X/Noche</label>
                            <input type="text" id="XNoche" className="form-control" value={XNoche} placeholder="Ej: $5000" onChange={e => setXNoche(e.target.value)}></input>
                        </div>
                        <div className="mb-3 col-6 col-sm-3">
                        <label className="form-label color-font">Reserva</label>
                            <input type="text" id="Reserva" className="form-control" placeholder="Ej: $10000"></input>
                        </div>
                        <div className="mb-3 col-6 col-sm-3">
                        <label className="form-label color-font">Adeuda</label>
                            <input type="text" id="Adeuda" className="form-control" placeholder="Ej: $10000"></input>
                        </div>
                        
                        <div className="mb-3 col-6 col-sm-3">
                        <label className="form-label color-font">Total</label>
                            <input type="number" id="Total" className="form-control" placeholder="Ej: $50000" value={Total} onChange={e => setTotal(e.target.value)}></input>
                            <button className='btn btn-primary mt-2' onClick={handleTotal}>Calcular</button>
                        </div>
                        <div className="mb-3 col-12">
                        <label className="form-label color-font">Observaciones</label>
                            <input type="text" id="Observaciones" className="form-control" placeholder="Ej: Con practicuna"></input>
                        </div>
                    </div>
                    <div id='alertS' className='relative'></div>
                    <button type="submit" className="btn btn-primary px-3" onClick={NuevaReserva}>Enviar</button>
                </fieldset>
                
            </form>
            </div>
        </div>
    </div>
  )
}

export default Formulario
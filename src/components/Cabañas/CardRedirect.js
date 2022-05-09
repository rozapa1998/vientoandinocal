import React from 'react'
import { Link } from 'react-router-dom'

const CardRedirect = ({cabana, id}) => {
    return (
    
    <div className='col-12 col-sm-3 p-3 mt-3'>
        <div className="card">
            <div className="card-body">
            <h5 className='card-title'>{cabana}</h5>
                <Link to={id} className="btn btn-primary">Seleccionar</Link>
            </div>
        </div>
    </div>
  )
}

export default CardRedirect
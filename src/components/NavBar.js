import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {

  const [Show, setShow] = useState("collapse navbar-collapse")

  const HandlerShow = () =>{
    
    if (Show === "collapse navbar-collapse") {
      setShow("collapse navbar-collapse show")
    }else{
      setShow("collapse navbar-collapse")
    }
  }


  return (
    <div className='NavBar'>
<nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand fs-4 text-white">Viento Andino</Link>
    <button onClick={HandlerShow} className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={Show} id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link to="/cabanaSelect" className="nav-link fs-5 text-white" >Cabañas</Link>
        <Link to="/gastos" className="nav-link fs-5 text-white" >Gastos</Link>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar
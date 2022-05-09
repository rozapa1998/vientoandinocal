//---------------------------------------COMPONENTS--------------------------------
//------------NavBar---------------------
import NavBar from './components/NavBar';
//------------Footer---------------------
import Footer from './components/Footer';

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//---------------------------------------REACT ROUTER DOM--------------------------
import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";

//Views
import Home from './components/Views/Home';
import Gastos from './components/Views/Gastos';
import CabañasSelect from './components/Views/CabañasSelect';
import Cabaña1 from './components/Views/CabañasViews/Cabaña1';
import Cabaña2 from './components/Views/CabañasViews/Cabaña2';
import Cabaña3 from './components/Views/CabañasViews/Cabaña3';
import Cabaña4 from './components/Views/CabañasViews/Cabaña4';
import Cabaña5 from './components/Views/CabañasViews/Cabaña5';
import Cabaña6 from './components/Views/CabañasViews/Cabaña6';
import Cabaña7 from './components/Views/CabañasViews/Cabaña7';
import Cabaña8 from './components/Views/CabañasViews/Cabaña8';
import Cabaña9 from './components/Views/CabañasViews/Cabaña9';
import Cabaña10 from './components/Views/CabañasViews/Cabaña10';

//Arreglar el REACT - ROUTER y lo LINKs

function App() {
  return (
    <Router>
      <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/" exact element={<Home/>}/>

        <Route path="/cabanaSelect" element={<CabañasSelect/>}/>
        <Route path="/cabanaSelect/cabana1" element={<Cabaña1/>}/>
        <Route path="/cabanaSelect/cabana2" element={<Cabaña2/>}/>
        <Route path="/cabanaSelect/cabana3" element={<Cabaña3/>}/>
        <Route path="/cabanaSelect/cabana4" element={<Cabaña4/>}/>
        <Route path="/cabanaSelect/cabana5" element={<Cabaña5/>}/>
        <Route path="/cabanaSelect/cabana6" element={<Cabaña6/>}/>
        <Route path="/cabanaSelect/cabana7" element={<Cabaña7/>}/>
        <Route path="/cabanaSelect/cabana8" element={<Cabaña8/>}/>
        <Route path="/cabanaSelect/cabana9" element={<Cabaña9/>}/>
        <Route path="/cabanaSelect/cabana10" element={<Cabaña10/>}/>

        <Route path="/gastos" element={<Gastos/>}/>
      </Switch>
    </div>
    <Footer></Footer>
    </Router>
    
  );
}

export default App;

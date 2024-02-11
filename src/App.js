
import './App.css';
import React from 'react';
import Register from './Component/Register';
import { Navigate,Routes, Route } from "react-router-dom";
import Home from './Page/Home';
import Login from './Component/Login'
import Jobcreat from './Component/Jobcreat';
import Jobdetails from './Card/Jobdetails';



function App() {
  return (
    <div >
        <Routes>
        <Route path="/*" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={< Home/>} />
        <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register/>} />
          <Route path='/Jobcreat' element={<Jobcreat/>}/>
          <Route path='/Jobdetails' element={<Jobdetails/>}/>
         
          
        </Routes>
     
      
    </div>
  );
}

export default App;

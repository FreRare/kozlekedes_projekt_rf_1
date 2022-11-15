import React, {useEffect, useState} from 'react';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';

import Bus from './components/Menetrendek/Bus'
import Villamos from './components/Menetrendek/Villamos';
import Troli from './components/Menetrendek/Troli';

import News from './components/News';
import Help from './components/Help';
import Profil from './components/Profil';
function App() {

  const [bevagyjelentkezeveBaszod, setBevagyjelentkezeveBaszod] = useState(false);

  useEffect(()=>{
    setBevagyjelentkezeveBaszod(JSON.parse(sessionStorage.getItem('loggedin')));
  })

  return(
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Menetrendek/Bus" element={<Bus/>}/>
          <Route path="/Menetrendek/Villamos" element={<Villamos/>}/>
          <Route path="/Menetrendek/Troli" element={<Troli/>}/>
          {bevagyjelentkezeveBaszod &&<Route path="/News" element={<News/>}/>}
          <Route path="/Help" element={<Help/>}></Route>
          <Route path="/Profil" element={<Profil/>}></Route>
          <Route path='*' element={<Layout/>}></Route>
        </Route>
      </Routes>
    </>
  )
  
}

export default App;

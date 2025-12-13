
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Directory from './pages/Directory';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import { useState } from 'react';
import Inventory from './pages/Inventory';
import Threshold from './pages/Threshold';
import ProfitLoss from './pages/ProfitLoss';
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/directory' element={<Directory/>}/>
      <Route path='/purchases' element={<Purchases/>}/>
      <Route path='/sales' element={<Sales/>}/>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='/tbo' element={<Threshold/>}/>
      <Route path='/pl' element={<ProfitLoss/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;


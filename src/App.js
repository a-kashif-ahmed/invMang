
import './App.css';
import Homepage from './pages/Homepage';
import {Route , BrowserRouter, Routes } from 'react-router-dom'
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/sales' element={<Sales/>}/>
    <Route path='/purchases' element={<Purchases/>}/>
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;

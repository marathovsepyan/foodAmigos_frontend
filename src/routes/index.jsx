import React from 'react'

import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Basket from '../pages/Basket';
import Orders from '../pages/Orders';

const MainRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/basket" element={<Basket />} />     
        <Route path="/orders" element={<Orders />} />    
      </Routes>
    );
  };
  
  export default MainRoutes;

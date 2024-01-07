import React from 'react'
import Home from './Home.jsx'
import Cuisine from './Cuisine.jsx';
import {Route, Routes, useLocation} from  'react-router-dom' 
import Searched from './Searched.jsx';
import Recipe from './Recipe.jsx';
import { AnimatePresence } from 'framer-motion';
function Pages() {
  const location =useLocation();
  return (
    <AnimatePresence>
      <Routes Location={location} key={location.pathname}>
          <Route path="/" element={<Home/>}/>
          <Route path="/cuisine/:type" element={<Cuisine/>}/>
          <Route path="/searched/:search" element={<Searched/>}/>
          <Route path="/recipe/:id" element={<Recipe/>} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages
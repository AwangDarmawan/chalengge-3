
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Satu from "./Pages/Satu";
import Dua from './Pages/Dua';
import Notpound from "./Pages/Notpound";


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Satu  />} />
        <Route path='/dua' element={<Dua />} />
        <Route path='/*' element={<Notpound />} />
      </Routes>
    </Router>
  )
}

export default App;

import React from 'react'
import Header from '../component/Header'
import { useState } from "react";


const Dua = () => {
    const [isRefresh, setIsRefresh] = useState(true)
  

  const setRefresh = (status) => {
    setIsRefresh(status)
  }
  return (
    <div className="App">
       <div className="content">
          
       <Header setRefresh={setRefresh}  isRefresh={isRefresh}/>
       </div>
    </div>

    
  )
}

export default Dua;

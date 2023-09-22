import React from 'react'
import TodoList from '../component/TodoList'
import { useState } from "react";


const Satu = () => {
    const [isRefresh, setIsRefresh] = useState(true)
  

  const setRefresh = (status) => {
    setIsRefresh(status)
  }
  return (
    <div className="App">
       <div className="content">   
       <TodoList setRefresh={setRefresh} 
      isRefresh={isRefresh} />
       </div>
    </div>
    
  )
}

export default Satu;

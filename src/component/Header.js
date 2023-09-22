import { useState } from "react";
import { useNavigate } from 'react-router-dom'

    const Header = ({setRefresh}) => {
        const navigate = useNavigate()
	// mengambil data dan menyimpan dari api  

        const [title, setTitle] = useState("");
       
        
        // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
        const addTodo = () => {
        
        const newTodo = {title, completed: false}      
        fetch('http://localhost:8000/todos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
         }).then(() => {
                
// ketika sukses menambah data, reset form dengan mengeset state title menjadi empty string 
            setTitle("")

            setRefresh(true)

            setTimeout(() => {
                            
            alert('new todo added.')
                        
            }, 500)
                
            });
    }

        return ( 
            <>
            <div className="container">
            <h1>Todo Input</h1>
            <div id="todo-header" className="header">
            <span className="ad-button">A</span>
            <input 
            
            type="text"
                
            value={title}
                
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input Data"
            />
            
				<button className="header-btn" onClick={addTodo}>Add</button>
                <button className="header-back" onClick={()=> navigate('/')}>Back</button> 
            </div>
        </div>
            </>
        );
};
 
export default Header;
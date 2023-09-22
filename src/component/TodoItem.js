import { useState } from "react";

const TodoItem = ({ todo, setRefresh }) => {

  	// Untuk fitur edit
	  const [editText, setEditText] = useState(todo.title);
	// Untuk toggle input
	  const [isEditing, setIsEditing] = useState(false);

    const updateTodo = () => {
        todo.completed = !todo.completed
    
        fetch("http://localhost:8000/todos/" + todo.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(todo)
        }).then(() => {
          console.log('todo updated.')
          setRefresh(true)
        })
      }

      const deleteTodo = () => {
        fetch("http://localhost:8000/todos/" + todo.id, {
          method: "DELETE",
        }).then(() => {
          console.log('todo deleted.')
          setRefresh(true);
        });
    };
    
    const changeTodo = () => {
      //  spread operator 
      const editedTodo = { ...todo, title: editText };
  
      fetch("http://localhost:8000/todos/" + todo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // body nya jadi editedTodo
        body: JSON.stringify(editedTodo),
      }).then(() => {
        console.log("todo updated.");
        // Jadi false biar balik seperti semula
        setIsEditing(false);
        setRefresh(true);
      });
    };

    return (
      <li className={`${todo.completed ? "checked" : ""}`}> 
      <>
        <div>
        {isEditing ? (
					<div className="task-container">
						<input
							type="text"
							value={editText}
							onChange={(e) => setEditText(e.target.value)}
						/>
						<span className="add-button" onClick={changeTodo}>
							Add
						</span>
					</div>
				) : (
          <div className="task-container">
          <div className="task-item" onClick={updateTodo}>
            {todo.title}
           
          </div>
          <span className="close" onClick={deleteTodo}>
            Hapus
          </span>
          <span
            className="edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </span>
        </div>
      )}
        </div>
        </>
      </li>

      
    );
  }; 
  export default TodoItem;
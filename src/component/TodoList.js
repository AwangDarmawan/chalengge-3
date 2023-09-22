import { useEffect, useState } from "react";
import TodoItem from './TodoItem'
import { useNavigate } from 'react-router-dom'



const TodoList = ({isRefresh, setRefresh}) => {  

	const navigate = useNavigate()
	// mengambil data dan menyimpan dari api  
    const [todos, setTodos] = useState([]);

      // Untuk filter todo
    const [filter, setFilter] = useState("all");
    // Untuk search todo
    const [query, setQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);


    useEffect(() => {
        // memanggil API untuk mengambil data todos
        if (isRefresh) {
          fetch("http://localhost:8000/todos")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setRefresh(false)
              // ketika Rest API sukses, simpan data dari response ke dalam state lokal
              setTodos(data);   
            })
            .catch((err) => {
              setRefresh(false)
              if (err.name === "AbortError") {
                console.log("fetch aborted.");
              }
            });
        }
      }, [isRefresh, setRefresh]);

      // Untuk fitur search
	const searchHandler = () => {
		// Cek jika searchnya kosong/tidak, kalau kosong direset
		if (query.length === 0) {
			setQueryResults([]);
			return;
		}

    // Kalau enggak diisi dengan todo yang cocok dengan input
		setQueryResults(
			todos.filter((todo) =>
				todo.title.toLowerCase().includes(query.toLowerCase())
			)
		);
	};
	// pencarian jika jika tidak sama dengan nol artinya tidak kosong
  const results = queryResults.length !== 0 ? queryResults : todos;

	// Untuk filter operator ternary
	const filteredTodos =
		filter === "all"
			? results
			: filter === "done"
			? results.filter((todo) => todo.completed === true)
			: filter === "todo" &&
			  results.filter((todo) => todo.completed === false);

	console.log(queryResults);
		
	const deleteDone = () => {
		// Ambil semua "todos" dengan atribut "done" yang true
		fetch("http://localhost:8000/todos")
		  .then((db) => {
			if (db.ok) {
			  return db.json();
			} else {
			  throw new Error('Failed to fetch todos.');
			}
		  })
		  .then((todos) => {
			// Filter "todos" yang memiliki atribut "done" true
			const completedTodos = todos.filter((todo) => todo.completed === true);
	  
			// Hapus setiap "doneTodo"
			Promise.all(
			  completedTodos.map((completedTodo) =>
				fetch(`http://localhost:8000/todos/${completedTodo.id}`, {
				  method: "DELETE",
				})
			  )
			)
			  .then(() => {
				console.log('Done  deleted.');
				setRefresh(true);
			  })
			  .catch((error) => {
				console.error('Failed to delete done :', error);
			  });
		  })
		  .catch((error) => {
			console.error('An error occurred:', error);
		  });
	  };


	  const deleteTodo = () => {
		// Ambil semua "todos" dengan atribut "done" yang true
		fetch("http://localhost:8000/todos")
		  .then((db) => {
			if (db.ok) {
			  return db.json();
			} else {
			  throw new Error('Failed to fetch todos.');
			}
		  })
		  .then((todos) => {
			// Filter "todos" yang memiliki atribut "done" true
			const completedTodos = todos.filter((todo) => todo.completed === false);
	  
			// Hapus setiap "doneTodo"
			Promise.all(
			  completedTodos.map((completedTodo) =>
				fetch(`http://localhost:8000/todos/${completedTodo.id}`, {
				  method: "DELETE",
				})
			  )
			)
			  .then(() => {
				console.log('Done  deleted.');
				setRefresh(true);
			  })
			  .catch((error) => {
				console.error('Failed to delete done :', error);
			  });
		  })
		  .catch((error) => {
			console.error('An error occurred:', error);
		  });
	  };
    return ( 
        <>
		  <div className="container">
		  <h1>Search</h1>
            <div id="todo-header" className="search">
			<div className="span-input">
			<span className="span-button">S</span>
            <input 
            
            type="text"
                
            value={query}
                
            onChange={(e) => setQuery(e.target.value)}
			placeholder="Search"
            
            />
			</div>
				<button className="search-btn" onClick={searchHandler}>Search</button>

				 <button className="search-add" onClick={()=> navigate('/dua')}>add Task</button> 
            </div>
        </div>
				<div className="tex-filter"><h1>TodoList</h1>
				<div className="allfilter">
					<button
						className="filter-btn"
						onClick={() => setFilter("all")}
					>
						All
					</button>
					<button
						className="filter-btn"
						onClick={() => setFilter("done")}
					>
						Done
					</button>
					<button
						className="filter-btn"
						onClick={() => setFilter("todo")}
					>
						Todo
					</button>
				</div>

			</div>
			
      <ul id="todo-list">
				{filteredTodos.length === 0 ? (
					<h3 className="result-text">Tidak ada</h3>
				) : (
					filteredTodos.map((todo) => (
						<TodoItem
							todo={todo}
							key={todo.id}
							setRefresh={setRefresh}
						/>
					))
				)}
			</ul>
			<div className="delete-all">
			<button className="done-btn" onClick={deleteDone}>
            Delete Done Task
         	</button>
			 <button className="all-btn" onClick={deleteTodo}>
            Delete Todo Task
         	</button>
		  </div>
        </>
    );
}
 
export default TodoList;
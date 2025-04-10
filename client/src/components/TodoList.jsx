import React, { useEffect, useState } from 'react';
// import "../App.css"
import { FaRegSquare, FaCheckSquare, FaTrash } from "react-icons/fa";

export default function TodoList() {
    function getStoredData() {
        let data = localStorage.getItem("todos");
        try {
            // Try to parse the data as JSON
            return JSON.parse(data) || [];
        } catch (error) {
            // Handle the case where data is not a valid JSON string
            console.error("Error parsing JSON data:", error);
            return [];
        }
    }

    const [todos, setTodos] = useState(getStoredData());

    useEffect(() => {
        // Store todos as a JSON string
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(event) {
        event.preventDefault();
        let task = event.target.task.value;
        if (!task) {
            alert("Please provide a valid task");
            return;
        }
        event.target.reset();
        setTodos([...todos, { task: task, completed: false }]);
    }

    function changeTaskStatus(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function deleteTask(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <>
            <div className="container my-5 ">
                <div className='mx-auto rounded border p-4 bg-gray-800' style={{ minWidth: "800px", width: "100%", height: "500px" }}>
                    <h2 className='text-white text-2xl text-center mb-5'>My Todo List</h2>
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input className="w-[80%] mr-2 p-2 rounded-md" placeholder="New Task" name="task" />
                        <button className="border border-white rounded-md p-2 text-md text-white bg-blue-500" type="submit">Add</button>
                    </form>
                    {
                        todos.map((todo, index) => {
                            return (
                                <div key={index} className='flex justify-between items-center my-2 p-2 rounded-md border border-gray-300'
                                    style={{ backgroundColor: todo.completed ? "#5FD33E" : "lightblue" }}>

                                    <div className='me-auto'>
                                        {todo.task}
                                    </div>

                                    {/* code for checking completed task */}
                                    <div className="flex items-center space-x-4">
                                        {/* Toggle Complete */}
                                        {todo.completed ? (
                                            <FaCheckSquare
                                                className="text-green-600 text-xl cursor-pointer"
                                                onClick={() => changeTaskStatus(index)}
                                            />
                                        ) : (
                                            <FaRegSquare
                                                className="text-gray-600 text-xl cursor-pointer"
                                                onClick={() => changeTaskStatus(index)}
                                            />
                                        )}

                                        {/* Delete Task */}
                                        <FaTrash
                                            className="text-red-600 text-xl cursor-pointer"
                                            onClick={() => deleteTask(index)}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

const TodoListt = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // State to track the todo being edited

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/api/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTodos();
  };

  const updateTodo = async (id, updatedData) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:8080/api/todos/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingTodo(null); // Reset editing state
    fetchTodos();
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      title: e.target.title.value,
      description: e.target.description.value,
      dueDate: e.target.dueDate.value,
      category: e.target.category.value,
    };
    updateTodo(editingTodo._id, updatedData);
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <TodoForm fetchTodos={fetchTodos} />
      <div>
        {todos.map(todo => (
          <div key={todo._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
              {todo.dueDate && <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>}
              <span className={`text-xs px-2 py-1 rounded ${todo.category === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{todo.category}</span>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600" onClick={() => handleEditClick(todo)}>Edit</button>
              <button className="text-red-600" onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingTodo && (
        <form onSubmit={handleUpdateSubmit} className="p-4 border rounded mt-4">
          <h3 className="font-bold text-lg mb-2">Edit Todo</h3>
          <input
            type="text"
            name="title"
            defaultValue={editingTodo.title}
            placeholder="Title"
            className="block w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            defaultValue={editingTodo.description}
            placeholder="Description"
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            defaultValue={editingTodo.dueDate ? new Date(editingTodo.dueDate).toISOString().split('T')[0] : ''}
            className="block w-full mb-2 p-2 border rounded"
          />
          <select
            name="category"
            defaultValue={editingTodo.category}
            className="block w-full mb-2 p-2 border rounded"
          >
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          <button
            type="button"
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => setEditingTodo(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default TodoListt;
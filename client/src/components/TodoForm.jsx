import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ fetchTodos }) => {
    const [form, setForm] = useState({ title: '', description: '', dueDate: '', category: 'Non-Urgent' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/api/todos', form, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', }
            });
            setForm({ title: '', description: '', dueDate: '', category: 'Non-Urgent' });
            fetchTodos();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input name="title" required maxLength={100} className="w-full p-2 border" placeholder="Title" value={form.title} onChange={handleChange} />
            <textarea name="description" maxLength={500} className="w-full p-2 border" placeholder="Description" value={form.description} onChange={handleChange} />
            <input type="date" name="dueDate" className="w-full p-2 border" value={form.dueDate} onChange={handleChange} />
            <select name="category" className="w-full p-2 border" value={form.category} onChange={handleChange}>
                <option value="Urgent">Urgent</option>
                <option value="Non-Urgent">Non-Urgent</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Todo</button>
        </form>
    );
};

export default TodoForm;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/Routes/ProtectedRoute'; 
import TodoListt from './components/TodoListt'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <TodoListt />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<div className="text-center">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
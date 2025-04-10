import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
import ProtectedRoute from './components/Routes/ProtectedRoute'; // Make sure path is correct

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
              <TodoList />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<div className="text-center">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
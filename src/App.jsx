import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/auth/Auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Todo from './pages/todo/Todo';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Auth />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/todo' exact element={<Todo />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

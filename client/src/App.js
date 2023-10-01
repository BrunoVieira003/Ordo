import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import UserContext from './contexts/UserContext';
import { useState, useEffect } from 'react';

function App() { 

  const [token, setToken] = useState(localStorage.getItem('token') || "")

  // Salva o valor de token no localstorage toda vez que o valor é alterado
  useEffect(()=>{
    localStorage.setItem('token', token)
  }, [token])

  return (
      <UserContext.Provider value={ {token, setToken} }>
        <Router>
          <Header/>
          <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/register' element={<RegisterForm/>}/>
            <Route exact path='/login' element={<LoginForm/>}/>
            
          </Routes>
        </Router>
      </UserContext.Provider>
  );
}

export default App;

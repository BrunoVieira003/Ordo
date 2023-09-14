import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import UserContext from './contexts/UserContext';
import { useState, useEffect } from 'react';

function App() { 

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})

  // Salva o valor de user no localstorage toda vez que o valor é alterado
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
      <UserContext.Provider value={ {user, setUser} }>
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

import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() { 

  return (
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/register' element={<RegisterForm/>}/>
          <Route exact path='/login' element={<LoginForm/>}/>
        </Routes>
      </Router>
  );
}

export default App;

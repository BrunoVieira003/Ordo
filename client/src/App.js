import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>

      <Header/>

      <Routes>

        <Route exact path='/' element={<LandingPage/>}/>

      </Routes>


    </Router>
  );
}

export default App;

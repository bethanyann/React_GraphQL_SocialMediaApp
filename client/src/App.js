import { Route, Routes} from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigation from './components/Navigation';
import './App.css';
import { AuthProvider } from './context/auth';
//import AuthRoute from './utilities/AuthRoute';

export default function App() {
  return (
        <AuthProvider>
          <Navigation className="sticky-nav"/>
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='login' element={<Login/>}/>
              <Route path='register' element={<Register />} />
          </Routes>
        </AuthProvider>
  );
}

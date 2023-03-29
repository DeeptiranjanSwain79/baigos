import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import UpdatePassword from './components/UpdatePassword';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/update/:id' element={<UpdatePassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

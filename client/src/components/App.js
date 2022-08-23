import '../App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from '../routes/Auth';
import Todo from '../routes/Todo';
import Home from '../routes/Home';
import Navigation from './Navigation';
import { useState } from 'react';
import { tr } from 'date-fns/locale';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);



  return (
    <>
    {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn}/>}
      <Routes>
        {isLoggedIn ? (
        <>
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </>
        ) : (
        <>
          <Route path="/" element={<Auth/>} />
        </> 
        )}
      </Routes>
    </>
  );
}

export default App;

import './App.css';
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Auth from './routes/Auth';
import Todo from './routes/Todo';
import axios from "axios"
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);



  return (
    <>
      <Routes>
        {isLoggedIn ? (
        <>
          <Route path="/todo" element={<Todo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/" element={<Navigate replace to="/todo" />} />
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

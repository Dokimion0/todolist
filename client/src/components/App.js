import '../App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from '../routes/Auth';
import Todo from '../routes/Todo';
import Home from '../routes/Home';
import Navigation from './Navigation';
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';
import axios from 'axios';

function App() {
  const [userObj, setUserObj] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState(true)

  const userAuth =() => {
    axios.get("/api/isAuth")
    .then(res=>{
      setIsLoggedIn(true)
      console.log('then:', isLoggedIn)

    })
    .catch(err =>{
      console.log(err)
    })
    console.log(isLoggedIn)
  }

  useEffect(() =>{
    userAuth();
  },[])



  return (
    <>
    {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn}/>}
      <Routes>
        {isLoggedIn ? (
        <>
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </>
        ) : (
        <>
          <Route path="/" element={<Auth userAuth={userAuth} userObj={userObj}/>} />
        </> 
        )}
      </Routes>
    </>
  );
}

export default App;

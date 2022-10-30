import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './Components/Auth';
import Home from './Components/Home';
import TodoPage from './Components/Todo/Todo';
import Navigation from './Components/Navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [userObj, setUserObj] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState(true);

  const userAuth = () => {
    axios
      .get('/api/isAuth')
      .then((res) => {
        setIsLoggedIn(true);
        setUserObj({
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <>
      {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn} />}
      {/* <div
        style={{
          maxWidth: 890,
          width: '100%',
          margin: '0 auto',
          marginTop: 60,
          display: 'flex',
          justifyContent: 'center',
        }}
      > */}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/home"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/todo" element={<TodoPage userObj={userObj} />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={<Auth userAuth={userAuth} userObj={userObj} />}
            />
          </>
        )}
      </Routes>
      {/* </div> */}
    </>
  );
}

export default App;

import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from './routes/Auth';
import Todo from './routes/Todo';
import axios from "axios"
import { useEffect } from 'react';

function App() {

 

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route Path="/todo" element={<Todo/>} />
      </Routes>
    </>
  );
}

export default App;

import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoDate from './TodoDate';
import TodoItem from './TodoItem';

const Todo = ({ userObj }) => {
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[date.getDay()];
  const todayDate = [date, month, day, dayOfWeek];

  return (
    <>
      <TodoDate date={todayDate} />
      <TodoItem userObj={userObj} />
    </>
  );
};

export default Todo;

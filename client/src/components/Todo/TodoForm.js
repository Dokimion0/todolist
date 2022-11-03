import axios from 'axios';
import { useState } from 'react';

const TodoForm = ({ userObj, onCancel, onAddTasks }) => {
  const [task, setTask] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const taskObj = {
      text: task,
      createdAt: Date.now(),
      email: userObj.email,
    };
    onAddTasks(taskObj);
    setTask('');
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTask(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="editor">
        <div className="editorInput">
          <input
            placeholder="Add task"
            value={task}
            onChange={onChange}
            type="text"
          />
        </div>
      </div>
      <div className="editorBtn">
        <button type="submit">추가</button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
};
export default TodoForm;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo({userObj}) {
  const [editing, setEditing] = useState(false)
  const [task, setTask] = useState('')
  const [date, setDate] = useState(new Date().toDateString());
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const getTasks = () => {
    axios.get('api/tasks')
    .then(res => {
      setTasks(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(()=>{
      getTasks();
  },[])

  const toggleEdit = () => {
    setEditing(true)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const taskObj = {
      text : task,
      createdAt: Date.now(),
      email : userObj.email
    }
    axios.post("/api/task", taskObj)
  }

  const onChange = (e) => {
    const {value} = e.target;
    setTask(value)
  }

  const onDeleteClick = (text) => {
    console.log(text)
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      axios.delete("/api/task",{data : {text}})
    }
  }

  return (
    <>
      <div className="headerContent">
        <span>Today</span>
        <span>{date}</span>
        <div>
          {tasks.map((task,i) => (
            <div key={i}>
              <h4>{task.text}</h4>
              <button>edit</button>
              <button onClick={() => onDeleteClick(task.text)}>delete</button>
            </div>
          ))}
        </div>
        {!editing && (
          <>
            <button onClick={toggleEdit}>Add task</button>
          </>
        )}
      </div>
      <div className="viewContent">
        { editing && (
        <form onSubmit={onSubmit}>
          <div className="editor">
            <div className="editorInput">
              <input value={task} onChange={onChange} type="text"/>
            </div>
            <div className="editorBtn">
              <button type='button'>Cancel</button>
            </div>
          </div>
          <button type='sumbit' onClick={toggleEdit}>Add</button>
        </form>
        )}
      </div>
    </>
  );
}

export default Todo;

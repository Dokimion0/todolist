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
      console.log(res.data)
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
    setEditing(prev => !prev)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('a')
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
              <button>delete</button>
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
        <ul>
          <li>
            <form onSubmit={onSubmit}>
              {editing &&(
              <div className="editor">
                <div className="editorInput">
                  <input value={task} onChange={onChange} type="text"/>
                </div>
                <div className="editorBtn">
                  <button onClick={toggleEdit}>Cancel</button>
                </div>
              </div>
              )}
              <button type='sumbit' onClick={toggleEdit}>Add</button>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Todo;

import { useEffect, useState } from 'react';
import '../../App.css';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

const TodoItem = ({userObj}) => {
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskIndex, setTaskIndex] = useState('');
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState('');

  const getTasks = () => {
    axios
      .get('api/tasks')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const toggleEdit = () => {
    setEditing(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const taskObj = {
      text: task,
      createdAt: Date.now(),
      email: userObj.email,
    };
    axios.post('/api/task', taskObj);
    setTask('');
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTask(value);
  };

  const onDeleteClick = (text) => {
    console.log(text);
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      axios.delete('/api/task', { data: { text } });
    }
    setContextMenu(false);
  };

  const onClickTask = (e, text, i) => {
    e.preventDefault();
    setTaskIndex(i);
    console.log(text, i);
    setContextMenu(false);
    console.log('??');
  };

  const onContextMenu = (e, i, text) => {
    e.preventDefault();
    setContextMenu(true);
    setTaskIndex(i);
    setText(text);
    setPoints({ x: e.pageX, y: e.pageY });
    console.log(taskIndex, text, i);
  };
  return (
    <div className="taskContents">
      {!editing && (
        <div className="taskContent-btn">
          <span onClick={toggleEdit}>
            <AiOutlinePlus color="#0078d7" />
            Add task
          </span>
        </div>
      )}
      <div className="viewContent">
        {editing && (
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
              <button type="sumbit" onClick={toggleEdit}>
                추가
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="taskItems">
        {tasks.map((task, i) => (
          <div
            className={'taskItem editor' + (i === taskIndex ? ' active' : '')}
            key={i}
            onContextMenu={(e) => onContextMenu(e, i, task.text)}
            onClick={(e) => onClickTask(e, task.text, i)}
          >
            <div className="taskItem-title">
              <span>{task.text}</span>
              <div className="metaDataInfo">
                <span>작업</span>
              </div>

              {contextMenu && (
                <div
                  className="contextMenu"
                  style={{ top: points.y, left: points.x }}
                  value={i}
                >
                  <ul>
                    <li>
                      <div className="contextMenu-list">
                        <span>수정</span>
                      </div>
                    </li>
                    <li onClick={() => onDeleteClick(text)}>
                      <div className="contextMenu-list">
                        <span>삭제 test2</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoItem;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineBars, AiOutlinePlus } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';

function Todo({ userObj }) {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskIndex, setTaskIndex] = useState('');

  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState(false);

  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date('2016-07-28').getDay()];

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
  }, [tasks]);

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
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTask(value);
  };

  const onDeleteClick = (e, text) => {
    e.preventDefault();
    console.log(text);
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      axios.delete('/api/task', { data: { text } });
    }
  };

  const onContextMenu = (e, i, text) => {
    e.preventDefault();
    setContextMenu(true);
    setTaskIndex(i);
    setPoints({ x: e.pageX, y: e.pageY });
    console.log(taskIndex, text, i);
  };

  const onClickTask = (text, i) => {
    setTaskIndex(i);
    console.log(text, i);
    setContextMenu(false);
  };

  return (
    <>
      <div className="taskToolbar">
        <div className="taskToolbar-title">
          <div className="taskToolbar-item">
            <AiOutlineBars size="18" />
          </div>
          <div className="taskToolbar-item" style={{ flexBasis: 400 }}>
            <h2>오늘 할 일</h2>
          </div>
          <div className="taskToolbar-item">
            <div className="action">
              <BiSort size="18" />
            </div>
          </div>
        </div>
        <div className="subline">
          <span>
            {month}월 {day}일 {dayOfWeek}요일
          </span>
        </div>
      </div>

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
              <div className="editorBtn"></div>
              <button type="sumbit" onClick={toggleEdit}>
                추가
              </button>
            </form>
          )}
        </div>
        <div className="taskItems">
          {tasks.map((task, i) => (
            <div
              className={'taskItem editor' + (i === taskIndex ? ' active' : '')}
              key={i}
              onClick={(e) => onClickTask(task.text, i)}
              onContextMenu={(e) => onContextMenu(e, i, task.text)}
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
                  >
                    <ul>
                      <li>
                        <div className="contextMenu-list">
                          <span>수정</span>
                        </div>
                      </li>
                      <li>
                        <div className="contextMenu-list">
                          <span onClick={(e) => onDeleteClick(e, task.text)}>
                            삭제
                          </span>
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
    </>
  );
}

export default Todo;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo({ isLoggedIn, setIsLoggedIn }) {
  const [date, setDate] = useState(new Date().toDateString());
  const navigate = useNavigate();

  const onLogOutClick = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <div className="headerContent">
        <span>Today</span>
        <span>{date}</span>
      </div>
      <div className="viewContent">
        <ul>
          <li>
            <form>
              <div className="editor">
                <div className="editorInput">
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
              <div className="editorBtn">
                <button>Cancel</button>
                <button>Add task</button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Todo;

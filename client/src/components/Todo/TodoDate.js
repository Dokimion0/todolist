import '../../App.css';
import { BiSort } from 'react-icons/bi';
import { AiOutlineBars } from 'react-icons/ai';


const TodoDate = ({ date }) => {
  return (
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
          {date[1]}월 {date[2]}일 {date[3]}요일
        </span>
      </div>
    </div>
  );
};

export default TodoDate;

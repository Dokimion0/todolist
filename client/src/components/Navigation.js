import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import {  AiOutlineMenu } from 'react-icons/ai';

function Navigation({ setIsLoggedIn }) {
  const location = useLocation();

  const onLogOutClick = () => {
    setIsLoggedIn(false);
    axios.delete('/api/logout');
  };

  return (
    <>
      <nav>
        <div className="navLeft">
          <li>
            <AiOutlineMenu />
          </li>
        </div>
        <div className="navCenter">
          <li>
            <Link to="/home" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/todo" className="link">
              To do
            </Link>
          </li>
        </div>
        <div className='navRight'>
            <li onClick={onLogOutClick}>Profile</li>
        </div>
      </nav>
      {/* <ul>
        {location.pathname === '/todo' ? (
          <li>
            <Link to="/home">Home</Link>
          </li>
        ) : (
          <li>
            <Link to="/todo">Todo</Link>
          </li>
        )}
        <li onClick={onLogOutClick}>
          <Link to="/">Logout</Link>
        </li>
      </ul> */}
    </>
  );
}

export default Navigation;

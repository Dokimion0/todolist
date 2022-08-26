import axios from "axios";
import { Link, useLocation } from "react-router-dom";


function Navigation({setIsLoggedIn}){
    const location = useLocation();

    const onLogOutClick = () =>{
        setIsLoggedIn(false)
        axios.delete("/api/logout")
    }

    return(
    <>
        <ul>
            {location.pathname === '/todo' ? 
                <li><Link to="/home">Home</Link></li> : 
                <li><Link to="/todo">Todo</Link></li>
            }
            <li onClick={onLogOutClick}><Link to="/">Logout</Link></li>
        </ul>
    </>
    )
}

export default Navigation;
import axios from "axios";
import { Link } from "react-router-dom";

function Navigation({setIsLoggedIn}){
    const onLogOutClick = () =>{
        setIsLoggedIn(false)
        axios.post("/api/logout")
    }

    return(
    <>
        <ul>
            <li><Link to="/todo">Todo</Link></li>
            <li onClick={onLogOutClick}><Link to="/">Logout</Link></li>
        </ul>
    </>
    )
}

export default Navigation;
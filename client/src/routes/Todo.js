import { useNavigate } from "react-router-dom";

function Todo({isLoggedIn, setIsLoggedIn}){
    const navigate = useNavigate();

    const onLogOutClick = () =>{
        setIsLoggedIn(false)
        navigate("/")
    }

    return(
        <>
            <span>todo page</span>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}

export default Todo;
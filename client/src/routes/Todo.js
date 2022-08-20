import { useNavigate } from "react-router-dom";

function Todo({isLoggedIn, setIsLoggedIn}){
    const navigate = useNavigate();

    const onClick = () =>{
        setIsLoggedIn(false)
        navigate("/")
    }

    return(
        <>
            <span>todo page</span>
            <button onClick={onClick}>Log out</button>
        </>
    )
}

export default Todo;
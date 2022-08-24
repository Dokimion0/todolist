import axios from "axios"
import { useState } from "react"

function Modal({toggleModal, errorMsg, setErrorMsg}){
    const [inputs, setInputs] = useState({
        email : "",
        password : ""
    })
    
    const {email, password}= inputs


    const onChange = e => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
        // setErrorMsg('')
    }
    const onSubmit = e => {
        e.preventDefault();
        const userInfo = {
            email : email,
            password : password
        }
        axios.post("/api/register", userInfo)
        .then( res => {
            alert(res.data.msg);
            toggleModal();
        })
        .catch( err => {
            alert(err.response.data.msg);
        });
    }

    return(
        <div className="modal">
            <form onSubmit={onSubmit} className="modalBody">
                <button onClick={toggleModal}className="closebtn">×</button>
                <input name="email" type="text" onChange={onChange} placeholder="Email" />
                <input name="password" type="password" onChange={onChange} placeholder="Password"/>
                <input type="submit" value="회원가입"/>
            </form>
            <div>{errorMsg}</div>
        </div>
    )
}

export default Modal;
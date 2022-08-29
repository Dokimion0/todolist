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
            <form className="container"onSubmit={onSubmit} className="modalBody">
                <button onClick={toggleModal}className="closebtn">×</button>
                <span style={{color : "black", display : "block", marginBottom : "50px", 
                        fontSize : "20px", fontWeight: "bold"}}>회원가입</span>
                <input className="authInput" name="email" type="text" onChange={onChange} placeholder="Email" />
                <input className="authInput" name="password" type="password" onChange={onChange} placeholder="Password"/>
                <input className="authInput authSubmit" type="submit" value="가입하기"/>
            </form>
            <div>{errorMsg}</div>
        </div>
    )
}

export default Modal;
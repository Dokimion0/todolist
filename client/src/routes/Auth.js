import axios from "axios"
import { useState } from "react"
import Modal from "../components/Modal"


function Auth(){
    const [userObj, setUserObj] = useState(null);
    const [modal, setModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [inputs, setInputs] = useState({
        email : "",
        password : ""
    })
    const {email, password}= inputs

    const onSubmit = e => {
        e.preventDefault();
        const userInfo = {
            email : email,
            password : password
        }
        axios.post("/api/data",userInfo).catch( err => {
            setErrorMsg(err.response.data.msg)
        })
    }

    const onChange = e => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
        setErrorMsg('')

    }

    const toggleModal = () => setModal(prev => !prev)

    const isValidEmail = email.includes('@')
    const isValidPassword = password.length >= 8


    return(
        <>
            <form onSubmit={onSubmit} method="POST">
                <input name="email" type="text" onChange={onChange} placeholder="Email" />
                <input name="password" type="password" onChange={onChange} placeholder="Password"/>
                <input type="submit" value="로그인"/>
            </form>
            <div>{errorMsg}</div>
            <span onClick={toggleModal}>회원가입</span>
            {
                modal ? <Modal inputs={inputs} onChange={onChange} toggleModal={toggleModal}
                errorMsg={errorMsg} setErrorMsg={setErrorMsg} />: null
            }
        </>
    )
}

export default Auth
import { useState } from "react"
import Modal from "../components/Modal"


function Auth(){
    const [btnActive, setBtnActive] = useState(true)
    const [modal, setModal] = useState(false)
    const [inputs, setInputs] = useState({
        email : "",
        password : ""
    })
    const {email, password}= inputs

    const onSubmit = e => {
        e.preventDefault()
    }

    const onChange = e => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    const toggleModal = () => setModal(prev => !prev)

    const isValidEmail = email.includes('@')
    const isValidPassword = password.length >= 8
    const a =1
    

   
    
    
    return(
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" onChange={onChange} placeholder="Email" />
                <input name="password" type="password" onChange={onChange} placeholder="Password"/>
                <input disabled={!(isValidEmail&&isValidPassword)} type="submit" value="로그인"/>
            </form>
            <span onClick={toggleModal}>회원가입</span>
            {
                modal ? <Modal onChange={onChange} toggleModal={toggleModal}/>: null
            }
        </>
    )
}

export default Auth
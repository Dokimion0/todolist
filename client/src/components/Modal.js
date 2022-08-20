import axios from "axios"

function Modal({inputs, onChange, toggleModal}){
    const {email, password}= inputs
    const isValidEmail = email.includes('@')
    const isValidPassword = password.length >= 8

    const onSubmit = e => {
        e.preventDefault();
        const userInfo = {
            email : email,
            password : password
        }
        axios.post("/api/add", userInfo); 
    }

    return(
        <div className="modal">
            <form onSubmit={onSubmit} className="modalBody">
                <button onClick={toggleModal}className="closebtn">×</button>
                <input name="email" type="text" onChange={onChange} placeholder="Email" />
                <input name="password" type="password" onChange={onChange} placeholder="Password"/>
                <input disabled={!(isValidEmail&&isValidPassword)} type="submit" value="회원가입"/>
            </form>
        </div>
    )
}

export default Modal;
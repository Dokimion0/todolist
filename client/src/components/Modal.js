function Modal({onChange, toggleModal}){
    const onSubmit = e => {
        e.preventDefault()
    }

    return(
        <div className="modal">
            <form onSubmit={onSubmit} className="modalBody">
                <button onClick={toggleModal}className="closebtn">×</button>
                <input name="email" type="text" onChange={onChange} placeholder="Email" />
                <input name="password" type="password" onChange={onChange} placeholder="Password"/>
                <input type="submit" value="회원가입"/>
            </form>
        </div>
    )
}

export default Modal;
import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';

function Auth({ userAuth, userObj }) {
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      password: password,
    };
    axios
      .post('/api/login', userInfo)
      .then((res) => {
        alert(res.data.msg);
        userAuth();
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrorMsg('');
  };

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <div className="authContainer">
      <form className="container" onSubmit={onSubmit} method="POST">
        <input
          className="authInput"
          name="email"
          type="text"
          onChange={onChange}
          placeholder="Email"
        />
        <input
          className="authInput"
          name="password"
          type="password"
          onChange={onChange}
          placeholder="Password"
        />
        <input className="authInput authSubmit" type="submit" value="로그인" />
      </form>
      <span className="authSignUp" onClick={toggleModal}>
        회원가입
      </span>
      <span className="errorMessage">{errorMsg}</span>
      {modal ? (
        <Modal
          toggleModal={toggleModal}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ) : null}
    </div>
  );
}

export default Auth;

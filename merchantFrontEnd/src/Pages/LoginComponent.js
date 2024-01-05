import React, { useState } from "react";
import styled from "styled-components";
import UserService from "../Service/UserService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useUserContext } from "../Context/GlobalContext";

export const LoginComponent = () => {
  const { setMyUser } = useUserContext();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const userPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async () => {
    const user = { userName: userName };
    let logUser = { userName, password };
    try {
      const userLoginHandler = await UserService.loginUser(logUser);
      const res = userLoginHandler.data;
      if (res === "successful") {
        setMyUser(res);
        return navigate("/loginMenu", { state: user });
      } else {
        setUserName("");
        setPassword("");
        setShowError(true);
      }
    } catch (error) {
      setUserName("");
      setPassword("");
      setShowError(true);
    }
  };

  const newFunc = () => {
    setShowError(false);
  };

  return (
    <Wrapper>
      <div className="container">
        <h1>Login Page</h1>
        {showError && (
          <CustomAlert className="danger">
            Incorrect user name or password
            <span className="close-button" onClick={newFunc}>
              &#10006;
            </span>
          </CustomAlert>
        )}

        <div className="component">
          <label className="label-css">Username : </label>
          <input
            type="text"
            className="text-css"
            id="formGroupExampleInput"
            placeholder="username"
            onChange={userNameHandler}
            value={userName}
          />
        </div>

        <div>
          <div className="cen">
            <label className="label-css">Password : </label>
            <input
              type="password"
              className="text-css"
              id="formGroupExampleInput2"
              placeholder="password"
              onChange={userPasswordHandler}
              value={password}
            />
          </div>

          <div className="cen login-button">
            <button className="bt" onClick={loginHandler}>
              Login
            </button>
          </div>
        </div>

        <div className="cen">
          <p>If you do not have an account please,</p>
          <Link to="/signup">Signup</Link>
          <br />
        </div>
        <div className="cen">
          <p>
            <Link to="/passwordChange">Change Password</Link>
          </p>
          <p>or</p>
          <p>
            <Link to="/resetPassword">Reset Password</Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const CustomAlert = styled.div`
  position: relative;
  width: 400px;
  text-align: center;
  min-height: 25px;
  margin: 0% 30% 5px 30%;
  padding: 6px 16px;
  border-radius: 10px;

  ${({ className }) =>
    className === "success" &&
    `
    background-color: rgb(12, 123, 12);
    color: rgb(199, 244, 199);
  `}
  ${({ className }) =>
    className === "danger" &&
    `
    background-color: rgb(120, 20, 20);
    color: rgb(244, 199, 199);
  `}

  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`;

const Wrapper = styled.section`
  .alert-css {
    text-align: center;
    height: 40px;
    margin: 0% 10% 0% 10%;
    padding: 6px 16px;
    color: rgb(244, 199, 199);
    background-color: rgb(120, 20, 20);
    border-radius: 10px;
  }
  .label-css {
    height: 1.5rem;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  p {
    padding-right: 10px;
  }
  .text-css {
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .component {
    display: flex;
    justify-content: center;
  }

  .container {
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 75vh;
  }
  h1 {
    font-size: 2.2rem;
    display: flex;
    textalign: center;
    justify-content: center;
    color: #574646;
  }
  .cen {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-button {
    align-self: flex-end;
  }

  .bt {
    font-size: 1rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 6px 8px;
    width: 80px;
    margin: 10px;
  }

  button:hover {
    background-color: #4c3d3d;
    border: 2px solid #4c3d3d;
  }

  button:focus {
    background-color: rgb(76, 61, 61);
  }

  button:active {
    background-color: rgb(80, 80, 80);
  }
`;

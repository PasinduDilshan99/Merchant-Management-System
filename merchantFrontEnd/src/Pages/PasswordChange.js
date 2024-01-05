import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserService from "../Service/UserService";
import { ShowAlert } from "./ShowAlert";
import { Alert } from "react-bootstrap";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [reEnterPassword, setReEnterPassword] = useState();
  const [validation, setValidation] = useState({
    userName: true,
    password: true,
    newPassword: true,
    reEnterPassword: true,
  });
  const [showMessage, setShowMessage] = useState({
    trueFalse: false,
    variant: "",
    text: "",
  });
  const changeHandler = () => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
    const passwordChangeObj = {
      userName: userName,
      password: password,
      newPassword: newPassword,
      reEnterPassword: reEnterPassword,
    };
    if (validateFields()) {
      //console.log("change");
      const passwordChanger = async () => {
        try {
          const response = await UserService.changePassword(passwordChangeObj);
          console.log(response.data);
          if (response.data === "success") {
            setShowMessage({
              trueFalse: true,
              variant: "alert-css success",
              text: response.data,
            });
            alert(userName + ", Your Password are successfully updated");
            setUserName("");
            setPassword("");
            setNewPassword("");
            setReEnterPassword("");
            navigate("/login");
          } else {
            setShowMessage({
              trueFalse: true,
              variant: "alert-css danger",
              text: response.data,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      passwordChanger();
    }
  };

  const userChangeHandler = (e) => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
    setUserName(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
    setPassword(e.target.value);
  };
  const newPasswordChangeHandler = (e) => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
    setNewPassword(e.target.value);
  };
  const reEnterPasswordChangeHandler = (e) => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
    setReEnterPassword(e.target.value);
  };

  const validateFields = () => {
    const newValidation = {
      userName: !!userName,
      password: !!password,
      newPassword: !!newPassword,
      reEnterPassword: !!reEnterPassword,
    };
    setValidation(newValidation);
    return Object.values(newValidation).every((isValid) => isValid);
  };
  const newFunc = () => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
  };
  return (
    <Wrapper>
      <div className="container">
        <h1>Password Change</h1>

        <div>
          {showMessage.trueFalse ? (
            <CustomAlert className={showMessage.variant}>
              {showMessage.text}
              <span className="close-button" onClick={newFunc}>
                &#10006;
              </span>
            </CustomAlert>
          ) : (
            ""
          )}
        </div>

        <div className="body-content">
          <div className="">
            <div className={` ${validation.userName ? "" : "has-error"}`}>
              <label className="text-label">Username : </label>
              <input
                required
                name="userName"
                type="text"
                className={`input-label ${
                  validation.userName ? "" : "is-invalid"
                }`}
                placeholder="username"
                value={userName}
                onChange={userChangeHandler}
              />
            </div>
          </div>

          <div className="">
            <div className={` ${validation.password ? "" : "has-error"}`}>
              <label className="text-label">Old Password : </label>
              <input
                required
                name="password"
                type="password"
                className={`input-label ${
                  validation.password ? "" : "is-invalid"
                }`}
                placeholder="old-password"
                value={password}
                onChange={passwordChangeHandler}
              />
            </div>
          </div>

          <div className="">
            <div className={`${validation.newPassword ? "" : "has-error"}`}>
              <label className="text-label">New Password : </label>
              <input
                required
                name="newPassword"
                type="password"
                className={`input-label ${
                  validation.newPassword ? "" : "is-invalid"
                }`}
                placeholder="new password"
                value={newPassword}
                onChange={newPasswordChangeHandler}
              />
            </div>
          </div>

          <div className="">
            <div
              className={` ${validation.reEnterPassword ? "" : "has-error"}`}
            >
              <label className="text-label">Re-enter Password : </label>
              <input
                required
                name="reEnterPassword"
                type="password"
                className={`input-label ${
                  validation.reEnterPassword ? "" : "is-invalid"
                }`}
                placeholder="re-enter password"
                value={reEnterPassword}
                onChange={reEnterPasswordChangeHandler}
              />
            </div>
          </div>

          <div className="">
            <button className="corner-btn" onClick={changeHandler}>
              Reset
            </button>
          </div>
        </div>

        <div className="">
          <p>
            back to the <Link to="/login">login</Link>
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
  margin: 0% 10% 5px 20%;
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
    width: 400px;
    text-align: center;
    min-height: 25px;
    margin: 0% 10% 5px 20%;
    padding: 6px 16px;
    border-radius: 10px;
  }
  .success {
    background-color: rgb(12, 123, 12);
    color: rgb(199, 244, 199);
  }
  .danger {
    background-color: rgb(120, 20, 20);
    color: rgb(244, 199, 199);
  }
  .container {
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text-label {
    font-size: 1.2rem;
    height: 25px;
    margin-right: 4px;
    margin-bottom: 5px;
  }
  .input-label {
    height: 25px;
    margin-bottom: 5px;
  }
  .body-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .corner-btn {
    font-size: 0.8rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 3px 4px;
    width: 80px;
    margin-top: 5px;
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

  .has-error {
    color: red;
  }

  .is-invalid {
    border-color: red;
  }
`;

export default PasswordChange;

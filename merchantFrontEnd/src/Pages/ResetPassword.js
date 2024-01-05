import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showMessage, setShowMessage] = useState({
    trueFalse: false,
    variant: "",
    text: "",
  });
  const [validation, setValidation] = useState({
    userName: true,
    q1: true,
    q2: true,
    q3: true,
    password: true,
    reEnterPassword: true,
  });

  const validateFields = () => {
    const newValidation = {
      userName: userName !== "",
      q1: answers.q1 !== "",
      q2: answers.q2 !== "",
      q3: answers.q3 !== "",
      password: password !== "",
      reEnterPassword: reEnterPassword !== "",
    };
    setValidation(newValidation);
    return Object.values(newValidation).every((isValid) => isValid);
  };

  const userChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const questionHandler = (e) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [e.target.name]: e.target.value,
    }));
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onResetPasswordChangeHandler = (e) => {
    setReEnterPassword(e.target.value);
  };

  const newFunc = () => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
  };

  const resetHandler = () => {
    newFunc();
    const passObj = { userName, answers, password, reEnterPassword };

    if (validateFields()) {
      const resetPassword = async () => {
        try {
          const response = await UserService.resetPassword(passObj);

          if (response.data === "successfully reset password") {
            setShowMessage({
              trueFalse: true,
              variant: "success",
              text: response.data,
            });
            alert(userName + ", successfully reset your password");
            setUserName("");
            setAnswers({ q1: "", q2: "", q3: "" });
            setPassword("");
            setReEnterPassword("");
            navigate("/login");
          } else {
            setShowMessage({
              trueFalse: true,
              variant: "danger",
              text: response.data,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      resetPassword();
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h1>Password Reset</h1>

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
          <div className={` ${validation.userName ? "" : "has-error"}`}>
            <label className="text-label">Username : </label>
            <input
              onFocus={newFunc}
              required
              name="userName"
              type="text"
              className={`input-label ${
                validation.userName ? "" : "is-invalid"
              }`}
              placeholder="username"
              value={userName || ""}
              onChange={userChangeHandler}
            />
          </div>

          <div className={` ${validation.q1 ? "" : "has-error"}`}>
            <label className="text-label">Question 1 : </label>
            <input
              onFocus={newFunc}
              required
              name="q1"
              type="text"
              className={`input-label ${
                validation.password ? "" : "is-invalid"
              }`}
              placeholder="answer"
              value={answers.q1 || ""}
              onChange={questionHandler}
            />
          </div>

          <div className={` ${validation.q2 ? "" : "has-error"}`}>
            <label className="text-label">Question 2 : </label>
            <input
              onFocus={newFunc}
              required
              name="q2"
              type="text"
              className={`input-label ${validation.q2 ? "" : "is-invalid"}`}
              placeholder="answer"
              value={answers.q2 || ""}
              onChange={questionHandler}
            />
          </div>

          <div className={` ${validation.q3 ? "" : "has-error"}`}>
            <label className="text-label">Question 3 : </label>
            <input
              onFocus={newFunc}
              required
              name="q3"
              type="text"
              className={`input-label ${validation.q3 ? "" : "is-invalid"}`}
              placeholder="answer"
              value={answers.q3 || ""}
              onChange={questionHandler}
            />
          </div>

          <div className={` ${validation.password ? "" : "has-error"}`}>
            <label className="text-label">New password : </label>
            <input
              onFocus={newFunc}
              required
              name="password"
              type="password"
              className={`input-label ${
                validation.password ? "" : "is-invalid"
              }`}
              placeholder="new-password"
              value={password || ""}
              onChange={onPasswordChangeHandler}
            />
          </div>

          <div className={` ${validation.reEnterPassword ? "" : "has-error"}`}>
            <label className="text-label">Re-Enter password : </label>
            <input
              onFocus={newFunc}
              required
              name="reEnterPassword"
              type="password"
              className={`input-label ${
                validation.reEnterPassword ? "" : "is-invalid"
              }`}
              placeholder="re-Enter-password"
              value={reEnterPassword || ""}
              onChange={onResetPasswordChangeHandler}
            />
          </div>

          <div className="">
            <button className="corner-btn" onClick={resetHandler}>
              Reset
            </button>
          </div>
        </div>

        <div className="container ">
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
  .container {
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 75vh;
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

export default ResetPassword;

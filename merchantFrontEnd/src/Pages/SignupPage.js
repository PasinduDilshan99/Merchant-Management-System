import React, { useState } from "react";
import styled from "styled-components";
import UserService from "../Service/UserService";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/GlobalContext";
import { Alert } from "react-bootstrap";

export const SignupPage = () => {
  const { setMyUser } = useUserContext();
  const navigate = useNavigate();
  const [userExist, setUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    reEnterPassword: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [validation, setValidation] = useState({
    userName: true,
    userEmail: true,
    userPassword: true,
    reEnterPassword: true,
  });

  const onHandleChange = (e) => {
    setShowError(false)
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const newValidation = {
      userName: !!user.userName,
      userEmail: !!user.userEmail,
      userPassword: !!user.userPassword,
      reEnterPassword:
        !!user.reEnterPassword && user.userPassword === user.reEnterPassword,
    };
    setValidation(newValidation);
    return Object.values(newValidation).every((isValid) => isValid);
  };

  const handleSignup = () => {
    setShowError(false);
    setIsLoading(true);
    setUserExist(false);
    const fetchUser = async () => {
      try {
        if (!userExist && user.userPassword !== user.reEnterPassword) {
          setValidation({ ...user, userPassword: "", reEnterPassword: "" });
          return alert("Password and Re-Enter Password are not match");
        } else if (!userExist && validateFields()) {
          const response = await UserService.addUser(user);
          if (response.data === "successful") {
            // console.log("successful");
            setMyUser(user);
            setUser({
              userName: "",
              userEmail: "",
              userPassword: "",
              reEnterPassword: "",
            });
            navigate("/questions", { state: user });
          } else if (response.data === "user exists") {
            setShowError(true);
            //console.log("user exists");
            setErrorMessage("user exists");
            setUser({
              userName: "",
              userEmail: "",
              userPassword: "",
              reEnterPassword: "",
            });
          } else {
            setShowError(true);
            // console.log("something get wrong");
            setErrorMessage("something get wrong");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="">Signup</h1>

        <div className="">
          {showError && (
           <CustomAlert className="danger">
            {errorMessage}
            <span className="close-button" onClick={()=>setShowError(false)}>
              &#10006;
            </span>
          </CustomAlert>
          )}
        </div>

        <div className="content">
          <div className="cen">
            <div className={`line ${validation.userName ? "" : "has-error"}`}>
              <label className="label-css">Username : </label>
              <input
                required
                name="userName"
                type="text"
                className={`${validation.userName ? "" : "is-invalid"}`}
                placeholder="username"
                value={user.userName}
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="cen">
            <div className={`line ${validation.userEmail ? "" : "has-error"}`}>
              <label className="label-css">E-mail : </label>
              <input
                required
                name="userEmail"
                type="email"
                className={`${validation.userEmail ? "" : "is-invalid"}`}
                placeholder="e-mail"
                value={user.userEmail}
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="cen">
            <div
              className={`line ${validation.userPassword ? "" : "has-error"}`}
            >
              <label className="label-css">Password : </label>
              <input
                required
                name="userPassword"
                type="password"
                className={`${validation.userPassword ? "" : "is-invalid"}`}
                placeholder="password"
                value={user.userPassword}
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="cen">
            <div
              className={`line ${
                validation.reEnterPassword ? "" : "has-error"
              }`}
            >
              <label className="label-css">Re-enter Password : </label>
              <input
                required
                name="reEnterPassword"
                type="password"
                className={`${validation.reEnterPassword ? "" : "is-invalid"}`}
                placeholder="re-enter password"
                value={user.reEnterPassword}
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="cen btn-css">
            <button className="bt" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>

        <div className="cen">
          <p>
            If you already have an account, please{" "}
            <Link to="/login">login</Link>
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
  margin: 0% 20% 5px 20%;
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
    width: 300px;
    height: 30px;
    margin: 0% 10% 0% 10%;
    margin-bottom: 5px;
    padding: 6px 16px;
    color: rgb(244, 199, 199);
    background-color: rgb(120, 20, 20);
    border-radius: 10px;
  }
  h1 {
    font-size: 2.2rem;
    display: flex;
    textalign: center;
    justify-content: center;
    color: #574646;
  }
  .container {
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  // .line {
  //   border: 2px solid red;
  //   display: flex;
  //   justify-content: flex-end;
  //   align-items: flex-end;
  // }
  .label-css {
    width: ;
  }
  .content {
    display: flex;
    flex-direction: column;
    //border: 2px solid black;
    align-items: flex-end;
    max-width: 500px;
  }
  .cen {
    font-size: 1.1rem;
    margin: 2px;
    padding: 1px;
  }

  .bt {
    margin-left: 20px;
  }

  .has-error {
    color: red;
  }

  .is-invalid {
    border-color: red;
  }
  .bt {
    font-size: 0.9rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 3px 4px;
    width: 80px;
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

  .btn-css {
    align-self: flex-end;
  }
`;

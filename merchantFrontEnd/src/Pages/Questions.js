import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionService from "../Service/QuestionService";

export const Questions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state);
  const data = location.state;
  const userName = data?.userName;
  const password = data?.userPassword;
  //console.log(userName);
  const [question, setQuestion] = useState({ q1: "", q2: "", q3: "" });

  const [validation, setValidation] = useState({
    q1: true,
    q2: true,
    q3: true,
  });

  const validateFields = () => {
    const newValidation = {
      q1: !!question.q1.trim(),
      q2: !!question.q2.trim(),
      q3: !!question.q3.trim(),
    };
    setValidation(newValidation);
    return Object.values(newValidation).every((isValid) => isValid);
  };

  const onHandleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const onHandleClick = async () => {
    // console.log(question);
    // console.log(userName);
    try {
      if (validateFields()) {
        const response = await QuestionService.addQuestions(userName, question);
        console.log(response.data);
        setQuestion({ q1: "", q2: "", q3: "" });
        const user = { userName: userName, password: password };
        alert("successfully add answers");
        navigate("/loginMenu", { state: user });
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h1>Questions</h1>

        <div className="">
          <div className={` ${validation.q1 ? "" : "has-error"}`}>
            <h2>Question 1 : </h2>
            <div className="">
              <label className="">Answer : </label>
              <input
                name="q1"
                type="text"
                className={` ${validation.q1 ? "" : "is-invalid"}`}
                value={question.q1}
                onChange={onHandleChange}
              />
            </div>
          </div>
          <div className={` ${validation.q2 ? "" : "has-error"}`}>
            <h2>Question 2 : </h2>
            <div className="">
              <label className="">Answer : </label>
              <input
                name="q2"
                type="text"
                className={` ${validation.q2 ? "" : "is-invalid"}`}
                value={question.q2}
                onChange={onHandleChange}
              />
            </div>
          </div>
          <div className={` ${validation.q3 ? "" : "has-error"}`}>
            <h2>Question 3 : </h2>
            <div className="">
              <label className="">Answer : </label>
              <input
                name="q3"
                type="text"
                className={` ${validation.q3 ? "" : "is-invalid"}`}
                value={question.q3}
                onChange={onHandleChange}
              />
            </div>
          </div>
        </div>

        <div className="cen">
          <button className="bt" onClick={onHandleClick}>
            Submit
          </button>{" "}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h1 {
    //border: 2px solid black;
    font-size: 2.2rem;
    display: flex;
    textalign: center;
    justify-content: center;
    color: #574646;
  }
  .container {
    //border: 2px solid black;
    margin: 0;
    background-color: rgb(255, 247, 225);
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-top: 10px;
    margin-bottom: 25px;
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

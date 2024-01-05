import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomePage = () => {
  return (
    <Wrapper>
      <div className="con">
        <Link to="login">
          <button className="bt">Login Page</button>
        </Link>
        <Link to="signup">
          <button className="bt">Signup Page</button>
        </Link>
        <Link to="merchant">
          <button className="bt">View Merchant</button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .con {
    background-color: rgb(255, 247, 225);
    height: 75vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .bt {
    font-size: 1.5rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 6px 8px;
    width: 200px;
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

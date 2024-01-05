import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserService from "../Service/UserService";
import { useUserContext } from "../Context/GlobalContext";
import styled from "styled-components";

export const LoginHome = () => {
  const { myUser, setMyUserId } = useUserContext();
  const location = useLocation();
  const data = location.state;
  let userName = data?.userName;
  if (!userName) {
    userName = myUser.userName;
  }
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await UserService.findUserIdByUserName(userName);
        setMyUserId(response.data);

        setUserId(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserId();
  }, []);
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>Menu</h2>
        </div>
        <Link to="/create" state={{ userId: userId }}>
          <button className="bt">Create Merchant</button>
        </Link>
        <Link to="/merchants" state={{ userId: userId }}>
          <button className="bt">View Merchants</button>
        </Link>
        <Link to="/stores" state={{ userId: userId }}>
          <button className="bt">View Stores</button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-size: 2rem;
    color: #574646;
  }
  .bt {
    font-size: 1rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 8px 10px;
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

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../utils/The Merch Logo FC.png";

const Navbar = () => {
  const navList = [
    { name: "Home", li: "/" },
    { name: "About", li: "about" },
    { name: "Contact Us", li: "contact" },
  ];
  return (
    <Wrapper>
      <nav>
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>

        <ul className="nav-ul">
          {navList.map((item) => {
            return (
              <li key={item.name}>
                <Link to={item.li}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <div>
          <Link to="/login">
            <button type="button" className="login-button">
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .logo {
    margin-left:10px;
    height:50px;
  }

  @media (max-width: 600px) {
    .logo {
      font-size: 1.2rem;
    }
  }
  nav {
    background-color: rgb(255, 247, 210);
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-evenly;
  }

  li {
    font-color: red;
    list-style-type: none;
  }

  .login-button {
    font-size: 0.9rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 6px 8px;
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

export default Navbar;

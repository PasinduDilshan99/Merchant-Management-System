import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <div className="container-footer">
        <footer className="">
          <p className="">© 2023 Merchant System</p>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  footer {
    display:flex;
    justify-content:center;
    align-items:center;
  }
  p {
    text-align: center;
  }
  .container-footer {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(255, 247, 200);
  }
`;

export default Footer;

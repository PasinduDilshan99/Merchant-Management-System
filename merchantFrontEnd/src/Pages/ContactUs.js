import React from "react";
import styled from "styled-components";

export const ContactUs = () => {
  return (
    <Wrapper>
      <div className="container">

        <div className="">

          <form className="">
            <h2 className="">Send Us A Message</h2>

            <div className="">
              <input
                className="input-css"
                type="text"
                name="name"
                placeholder="Full Name"
              />
            </div>

            <div className="">
              <input
                className="input-css"
                type="text"
                name="email"
                placeholder="E-mail"
              />
            </div>
            <div className="">
              <input
                className="input-css"
                type="text"
                name="phone"
                placeholder="Phone"
              />
            </div>
            <div className="">
              <textarea
                className="input-css"
                name="message"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="">
              <button className="bt">Send</button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    //border: 2px solid black;
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-css {
    min-width: 350px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .label-css {
    height: 1.5rem;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .items {
    //border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    //min-width: 600px;
    flex: 0 1 0;
  }

  h2 {
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

  .error {
    border: 1px solid red;
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

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

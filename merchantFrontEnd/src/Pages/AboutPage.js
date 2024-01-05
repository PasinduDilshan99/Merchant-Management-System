import React from "react";
import aboutImage from "../utils/Merchant-management-system-the-key-challenges.webp";
import styled from "styled-components";

export const AboutPage = () => {
  return (
    <Wrapper>
      <div className="container-0">
        <div className="container">
          <div className="image">
            <img
              src={aboutImage}
              className=""
              alt="aboutImage"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>

          <div className="">
            <h1 className="">Description of merchant</h1>
            <p className="">
                A merchant is a person who trades in commodities produced by other
              people, especially one who trades with foreign countries.
              Historically, a merchant is anyone who is involved in business or
              trade. Merchants have operated for as long as industry, commerce,
              and trade have existed. In 16th-century Europe, two different
              terms for merchants emerged: meerseniers referred to local traders
              (such as bakers and grocers) and koopman (Dutch: koopman) referred
              to merchants who operated on a global stage, importing and
              exporting goods over vast distances and offering added-value
              services such as credit and finance.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container-0 {
    background-color: rgb(255, 247, 225);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image {
    display: flex;
  }

  img {
    flex: 1 1 0;
  }
  h1,
  p,
  img {
    margin: 2% 5%;
  }
  p{
    text-indent: 50px;
  }
`;

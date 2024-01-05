import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MerchantService from "../Service/MerchantService";
import { useLocation } from "react-router-dom";

export const CreatePage = () => {
  const location = useLocation();
  const data = location.state;
  const userId = data.userId;

  const [merchant, setMerchant] = useState({
    merchantName: "",
    merchantDescription: "",
    merchantAddress: "",
    merchantPhone: "",
    merchantEmail: "",
    userId: userId,
  });

  const [validation, setValidation] = useState({
    merchantName: true,
    merchantDescription: true,
    merchantAddress: true,
    merchantPhone: true,
    merchantEmail: true,
  });

  const onChangeHandle = (e) => {
    setMerchant({
      ...merchant,
      [e.target.name]: e.target.value,
      userId: userId,
    });
  };

  const validateFields = () => {
    const newValidation = {
      merchantName: !!merchant.merchantName,
      merchantDescription: !!merchant.merchantDescription,
      merchantAddress: !!merchant.merchantAddress,
      merchantPhone: !!merchant.merchantPhone,
      merchantEmail: !!merchant.merchantEmail,
    };
    setValidation(newValidation);
    return Object.values(newValidation).every((isValid) => isValid);
  };

  const CreateMerchantHandle = () => {
    // console.log(userId);
    // setMerchant((previousMerchant) => ({ ...previousMerchant, userId: userId }));
    console.log(merchant);
    const createMerchant = async () => {
      try {
        if (validateFields()) {
          const response = await MerchantService.addMerchant(merchant);
          //console.log(response.data);
          alert(merchant.merchantName + " successfully created");
          setMerchant({
            merchantName: "",
            merchantDescription: "",
            merchantAddress: "",
            merchantPhone: "",
            merchantEmail: "",
          });
        }
      } catch (error) {
        console.log(error);
        console.log("error");
      }
    };
    createMerchant();
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <h1>Create Page</h1>
        </div>

        <div className="items">
          <div className={`item ${validation.merchantName ? "" : "error"}`}>
            <label className="label-css">Name : </label>
            <input
              name="merchantName"
              type="text"
              aria-label="First name"
              className={`input-css ${validation.merchantName ? "" : "error"}`}
              value={merchant.merchantName}
              onChange={onChangeHandle}
            />
          </div>

          <div
            className={`item ${validation.merchantDescription ? "" : "error"}`}
          >
            <label className="label-css">Description : </label>
            <textarea
              name="merchantDescription"
              aria-label="First name"
              className={`input-css ${
                validation.merchantDescription ? "" : "error"
              }`}
              value={merchant.merchantDescription}
              onChange={onChangeHandle}
            />
          </div>

          <div className={`item ${validation.merchantAddress ? "" : "error"}`}>
            <label className="label-css">Address : </label>
            <textarea
              name="merchantAddress"
              aria-label="First name"
              className={`input-css ${
                validation.merchantAddress ? "" : "error"
              }`}
              value={merchant.merchantAddress}
              onChange={onChangeHandle}
            />
          </div>

          <div className={`item ${validation.merchantPhone ? "" : "error"}`}>
            <label className="label-css">Mobile number : </label>
            <input
              name="merchantPhone"
              type="text"
              aria-label="First name"
              className={`input-css ${validation.merchantPhone ? "" : "error"}`}
              value={merchant.merchantPhone}
              onChange={onChangeHandle}
            />
          </div>

          <div className={`item ${validation.merchantEmail ? "" : "error"}`}>
            <label className="label-css">email : </label>
            <input
              name="merchantEmail"
              type="text"
              aria-label="First name"
              className={`input-css ${validation.merchantEmail ? "" : "error"}`}
              value={merchant.merchantEmail}
              onChange={onChangeHandle}
            />
          </div>
        </div>

        <div className="cen">
          <button className="bt" onClick={CreateMerchantHandle}>
            Submit
          </button>
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

  h1 {
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
    //border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

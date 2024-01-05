import React, { useState } from "react";
import MerchantService from "../Service/MerchantService";
import { ShowAlert } from "./ShowAlert";
import styled from "styled-components";
import { Alert } from "react-bootstrap";

const ViewMerchantForAll = () => {
  const [merchantId, setMerchantId] = useState();
  const [merchant, setMerchant] = useState({});
  const [showError, setShowError] = useState(false);

  const onClickHandle = async (e) => {
    e.preventDefault();
    setShowError(false);
    try {
      const resp = await MerchantService.getMerchantById(merchantId);
      setMerchant(resp.data);
      if (resp.data === "") {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h2>Merchant</h2>

        <div className="cen">
          {showError && (
             <CustomAlert className="danger">
            merchant Id {merchantId} is does not exist, please check again
             <span className="close-button" onClick={()=>setShowError(false)}>
               &#10006; 
             </span>
           </CustomAlert>
          )}
        </div>
        <div className="cen">
          <form>
            <label>Merchant Id : </label>
            <input
              type="text"
              placeholder="Merchant Id"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
            />
            <button className="btn" onClick={onClickHandle}>
              Search
            </button>
          </form>
        </div>

        <div className="all-items">
          <div className="single-item">
            <h5>Merchant Name: {merchant.merchantName || ""}</h5>
          </div>
          <div className="single-item">
            <h5>Merchant Address: {merchant.merchantAddress || ""}</h5>
          </div>
          <div className="single-item">
            <h5>Merchant Mobile Number: {merchant.merchantPhone || ""}</h5>
          </div>
          <div className="single-item">
            <h5>Merchant Description: {merchant.merchantDescription || ""}</h5>
          </div>
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
  .alert-css {
    text-align: center;
    height: 30px;
    margin: 0% 10% 0% 10%;
    margin-bottom: 5px;
    padding: 6px 16px;
    color: rgb(244, 199, 199);
    background-color: rgb(120, 20, 20);
    border-radius: 10px;
  }
  .container {
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 75vh;
  }
  h2 {
    font-size: 2rem;
    display: flex;
    textalign: center;
    justify-content: center;
    color: #574646;
  }

  .cen {
    display: flex;
    justify-content: center;
  }

  .all-items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .single-item {
    font-size: 1.2rem;
    gap: 0;
    height: 30px;
  }
`;

export default ViewMerchantForAll;

import React, { useState, useEffect } from "react";
import MerchantService from "../Service/MerchantService";
import styled from "styled-components";

function DetailsMerchant() {
  const theMerchantId = 10002;
  const [merchant, setMerchant] = useState({});
  const [theNewStore, setTheNewStore] = useState();

  const onChangeHandler = (e) => {
    setTheNewStore(e.target.value);
  };

  const ChangeStore = async () => {
    const theStore = { storeNumber: theNewStore };
    console.log(theStore);
    try {
      const response = await MerchantService.changeMerchantStore(
        theMerchantId,
        theStore
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    MerchantService.getMerchantById(theMerchantId).then((res) => {
      setMerchant(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Merchant Details</h2>
      <div className="container text-center">
        <div>
          <div style={{ display: "flex" }}>
            <h5>Merchant Id : {merchant.merchantId}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Merchant Name : {merchant.merchantName}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Merchant Address : {merchant.merchantAddress}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Merchant Mobile Number : {merchant.merchantPhone}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Merchant Description : {merchant.merchantDescription}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Merchant E-mail : {merchant.merchantEmail}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>
              Merchant Store Number : {}{" "}
              <input
                name="merchantStore"
                value={theNewStore}
                onChange={onChangeHandler}
              />
              <button
                className="btn btn-success bt"
                onClick={ChangeStore}
                style={{
                  width: "60px",
                  height: "20px",
                  fontSize: "12px",
                  padding: "0",
                }}
              >
                Change Store
              </button>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsMerchant;
const Wrapper = styled.section`
  .cen {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .bt {
    background-color:red;
    margin-left: 20px;
  }

  .has-error {
    color: red;
  }

  .is-invalid {
    border-color: red;
  }
`;

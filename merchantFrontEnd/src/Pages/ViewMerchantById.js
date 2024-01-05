import React, { useEffect, useState } from "react";
import MerchantService from "../Service/MerchantService";
import { ShowAlert } from "./ShowAlert";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../Context/GlobalContext";
import styled from "styled-components";

const ViewMerchantById = () => {
  const { setMyMerchantId } = useUserContext();
  const location = useLocation();
  const data = location.state;
  //console.log(data);
  // if (!data.merchantId) {
  //   setMyMerchantId(data.merchantId);
  // }
  const [merchantId, setMerchantId] = useState(data.merchantId);
  const [merchant, setMerchant] = useState({});
  const [showError, setShowError] = useState(false);
  const [store, setStore] = useState({});
  // console.log(store);

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        const response = await MerchantService.getMerchantById(merchantId);
        setMerchant(response.data);
        setStore(response.data?.store);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerchant();
  }, []);

  // const onClickHandle = async (e) => {
  //   e.preventDefault();
  //   setShowError(false);
  //   try {
  //     const resp = await MerchantService.getMerchantById(merchantId);
  //     setMerchant(resp.data);
  //   } catch (error) {
  //     setShowError(true);
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <Wrapper>
      <div className="container">
        <h2>Merchant</h2>

        <div>
          {showError && <ShowAlert text={"Invalid Merchant Id"} />}
          <form>
            <label>Merchant Id : </label>
            <input
              type="text"
              placeholder="Merchant Id"
              value={merchantId}
              disabled
              onChange={(e) => setMerchantId(e.target.value)}
            />
          </form>
        </div>

        <div className="">
          <div className="all-value">
            <div className="single-value">
              <h5>Merchant Name : {merchant.merchantName || ""}</h5>
            </div>
            <div className="single-value">
              <h5>Merchant Address : {merchant.merchantAddress || ""}</h5>
            </div>
            <div className="single-value">
              <h5>Merchant Mobile Number : {merchant.merchantPhone || ""}</h5>
            </div>
            <div className="single-value">
              <h5>
                Merchant Description : {merchant.merchantDescription || ""}
              </h5>
            </div>
            <div className="single-value">
              <h5>Merchant e-mail : {merchant.merchantEmail || ""}</h5>
            </div>
            <div className="single-value">
              <h5>
                Store Number : {store?.storeNumber || "There is no Store"}
              </h5>
            </div>
            <div className="single-value">
              <h5>Store Status : {store?.storeStatus || ""}</h5>
            </div>
            <div className="single-value">
              <h5>Store type : {store?.storeType || ""}</h5>
            </div>
          </div>
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
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin: 0;
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
`;

export default ViewMerchantById;

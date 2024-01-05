import React, { useEffect, useState } from "react";
import MerchantService from "../Service/MerchantService";
import StoreService from "../Service/StoreService";
import { useLocation } from "react-router-dom";
import { ShowAlert } from "./ShowAlert";
import { useUserContext } from "../Context/GlobalContext";
import styled from "styled-components";
import { Alert } from "react-bootstrap";

const ChangeStore = () => {
  const { setMyStoreId } = useUserContext();
  const location = useLocation();
  const data = location.state;
  if (data.store?.storeNumber) {
    setMyStoreId(data.store?.storeNumber);
  }
  const [storeNumber, setStoreNumber] = useState(data.store?.storeNumber);
  const merchantId = data.merchantId;
  //console.log(storeNumber);
  //console.log(merchantId);
  const [showMessage, setShowMessage] = useState({
    trueFalse: false,
    variant: "",
    text: "",
  });

  const [store, setStore] = useState({});
  const [newStoreNumber, setNewStoreNumber] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    setNewStoreNumber(e.target.value);
  };

  const ChangeStoreHandler = async () => {
    const theMerchantId = merchantId;
    const theStoreNumber = newStoreNumber;

    try {
      const response = await MerchantService.changeMerchantStore(
        theMerchantId,
        theStoreNumber
      );
      console.log(response.data);
      if (
        response.data === "Store not found" ||
        response.data === "User can't access this store" ||
        response.data.startsWith("There is no store such as store number")
      ) {
        setShowMessage((previousMessage) => ({
          ...previousMessage,
          variant: "alert-css danger",
          text: response.data,
        }));
      } else if (response.data === "Success") {
        setStoreNumber(newStoreNumber);
        setShowMessage((previousMessage) => ({
          ...previousMessage,
          variant: "alert-css success",
          text: response.data,
        }));
      } else if (response.data === "Already exist") {
        setShowMessage((previousMessage) => ({
          ...previousMessage,
          variant: "alert-css warning",
          text: response.data,
        }));
      }
      setShowMessage((previousMessage) => ({
        ...previousMessage,
        trueFalse: true,
        text: response.data,
      }));
    } catch (error) {
      console.log("error");
      console.log(error);
      console.log("error");
      setShowMessage((previousMessage) => ({
        ...previousMessage,
        trueFalse: true,
        text: "error",
      }));
    }
  };
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await StoreService.getStoreById(storeNumber);
        setStore(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStore();
  }, [storeNumber]);

  const newFunc = () => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
  };

  return (
    <Wrapper>
      <div className="container">
        <h2 className="">Store Details</h2>

        <div>
          {showMessage.trueFalse ? (
            <CustomAlert className={showMessage.variant}>
              {showMessage.text}
              <span className="close-button" onClick={newFunc}>
                &#10006;
              </span>
            </CustomAlert>
          ) : (
            ""
          )}
        </div>

        <div className="items">
          <div>Store Number: {store?.storeNumber || "There is no Store"}</div>

          <div>Merchant Type: {store?.storeType || ""}</div>

          <div>Merchant Status: {store?.storeStatus || ""}</div>

          <div className="last">
            <div>New Store Number :</div>

            <input
              type="text"
              placeholder="new store number"
              value={newStoreNumber}
              onChange={onChangeHandler}
            />
            <button
              className="bt"
              style={{
                fontSize: "12px",
              }}
              onClick={ChangeStoreHandler}
            >
              Change Store
            </button>
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
  .container {
    //border: 2px solid black;
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    height: 75vh;
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

  .bt {
    font-size: 1rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 6px 8px;
    margin-left: 7px;
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

  .items {
    align-items: center;
    display: flex;
    font-size: 1.2rem;
    flex-direction: column;
    margin: 5px;
  }

  .items div {
    margin: 5px;
  }

  .last {
    display: flex;
  }

  .alert-css {
    width: 350px;
    text-align: center;
    height: 25px;
    margin: 0% 10% 0% 20%;
    padding: 6px 16px;
    border-radius: 10px;
  }
  .success {
    background-color: rgb(12, 123, 12);
    color: rgb(199, 244, 199);
  }
  .danger {
    background-color: rgb(120, 20, 20);
    color: rgb(244, 199, 199);
  }

  .warning {
    background-color: rgb(50, 18, 7);
    color: rgb(255, 226, 183);
  }
`;
export default ChangeStore;

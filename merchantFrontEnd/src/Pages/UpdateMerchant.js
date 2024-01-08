import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MerchantService from "../Service/MerchantService";
import { useLocation } from "react-router-dom";
import { ShowAlert } from "./ShowAlert";
import { useUserContext } from "../Context/GlobalContext";
import { Alert } from "react-bootstrap";

export const UpdateMerchant = () => {
  const location = useLocation();
  const data = location.state;
  const merchantId = data.merchantId;
  const userId = data.userId;

  const [merchant, setMerchant] = useState({});

  const [showMessage, setShowMessage] = useState({
    trueFalse: false,
    variant: "",
    text: "",
  });

  const onChangeHandler = (e) => {
    setMerchant((prevMerchant) => ({
      ...prevMerchant,
      [e.target.name]: e.target.value,
    }));
  };

  const UpdateMerchantHandler = () => {
    const updateMerchant = async () => {
      try {
        console.log(merchant);
        const resp = await MerchantService.updateMerchant(merchant);

        setShowMessage({
          trueFalse: true,
          variant: "alert-css success",
          text: "successfully updated",
        });
      } catch (error) {
        //  console.log("error");
        console.log(error);
        setShowMessage({
          trueFalse: true,
          variant: "alert-css danger",
          text: "unsuccessful",
        });
      }
    };
    updateMerchant();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await MerchantService.getMerchantById(merchantId);
        setMerchant(res.data);
        setMerchant((prevMerchant) => ({ ...prevMerchant, userId: userId }));
        console.log(merchant);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const newFunc = () => {
    setShowMessage((previousMessage) => ({
      ...previousMessage,
      trueFalse: false,
    }));
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <h1>Update Page</h1>
        </div>

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
          <div className="item">
            <label className="label-css">Name : </label>
            <input
              name="merchantName"
              type="text"
              className="input-css"
              value={merchant.merchantName || ""}
              onChange={onChangeHandler}
            />
          </div>
          <div className="item">
            <label className="label-css">Description : </label>
            <textarea
              name="merchantDescription"
              className="input-css"
              value={merchant.merchantDescription || ""}
              onChange={onChangeHandler}
            />
          </div>
          <div className="item">
            <label className="label-css">Address : </label>
            <textarea
              name="merchantAddress"
              className="input-css"
              value={merchant.merchantAddress || ""}
              onChange={onChangeHandler}
            />
          </div>
          <div className="item">
            <label className="label-css">Mobile number : </label>
            <input
              name="merchantPhone"
              type="text"
              className="input-css"
              value={merchant.merchantPhone || ""}
              onChange={onChangeHandler}
            />
          </div>
          <div className="item">
            <label className="label-css">email : </label>
            <input
              name="merchantEmail"
              type="email"
              className="input-css"
              value={merchant.merchantEmail || ""}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="cen">
          <button className="bt" onClick={UpdateMerchantHandler}>
            Update
          </button>
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
    width: 200px;
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

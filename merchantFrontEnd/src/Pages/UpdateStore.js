import React, { useEffect, useState } from "react";
import StoreService from "../Service/StoreService";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const UpdateStore = () => {
  const location = useLocation();
  const theData = location.state;
  const theStoreNumber = theData?.storeNumber;
  //const theStoreNumber = 1001;
  const navigate = useNavigate();

  const [store, setStore] = useState({});

  const [showMessage, setShowMessage] = useState({
    trueFalse: false,
    variant: "",
    text: "",
  });

  const onChangeHandler = (e) => {
    setStore((previousStore) => ({
      ...previousStore,
      [e.target.name]: e.target.value,
    }));
  };

  const UpdateStoreHandler = () => {
    const updateStore = async () => {
      try {
        
        const res = await StoreService.updateStore(store);
        console.log(store);
        setShowMessage({
          trueFalse: true,
          variant: "alert-css success",
          text: "successfully updated",
        });
        alert("successfully updated")
        navigate(-1)
      } catch (error) {
        console.log(error);
        setShowMessage({
          trueFalse: true,
          variant: "alert-css danger",
          text: "unsuccessful",
        });
      }
    };
    updateStore();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StoreService.getStoreById(theStoreNumber);
        setStore(response.data);
        setStore((previousStore) => ({
          ...previousStore,
          storeNumber: theStoreNumber,
        }));
      } catch (error) {
        console.log("error");
        console.log(error);
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
        <h2 className="">Update Store</h2>

        
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

        <div className="">
          {store ? (
            <form>
              <div className="items">
                <div className="item">
                  <label>Store Number :</label>
                  <input
                    name="storeNumber"
                    type="text"
                    value={store.storeNumber || ""}
                    // disabled={true}
                  />
                </div>

                <div className="item">
                  <label>Store Status :</label>
                  <input
                    name="storeStatus"
                    type="text"
                    value={store.storeStatus || ""}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="item">
                  <label>Store Type :</label>
                  <input
                    name="storeType"
                    type="text"
                    value={store.storeType || ""}
                    onChange={onChangeHandler}
                  />
                </div>

                <div>
                  <button className="bt" onClick={UpdateStoreHandler}>
                    update store
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p>Loading...</p>
          )}
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
    align-items: flex-end;
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

  label {
    margin-right: 10px;
  }
`;

export default UpdateStore;

import React, { useEffect, useState } from "react";
import StoreService from "../Service/StoreService";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../Context/GlobalContext";
import styled from "styled-components";

const ViewSingleStore = () => {
  const { newStoreId } = useUserContext();
  const location = useLocation();
  const data = location.state;
  const userId = data.userId;
  // console.log(location.state);
  // console.log(location.state.storeNumber);
  if (data?.storeNumber) {
    newStoreId(data.storeNumber);
  }
  const theStoreNumber = location.state.storeNumber;
  const [store, setStore] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StoreService.getStoreById(theStoreNumber);
        // console.log(response.data);
        setStore(response.data);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <h2>Store Details</h2>

        <div className="items">
          {store ? (
            <div>
              <div className="item">Store Id : {store.storeNumber}</div>
              <div className="item">Store Status : {store.storeStatus}</div>
              <div className="item">Store Type : {store.storeType}</div>
              <div className="item-last">
                <Link
                  to="/updateStore"
                  state={{ storeNumber: store.storeNumber, userId: userId }}
                >
                  <button className="bt">update store</button>
                </Link>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
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

  h2 {
    font-size: 2.2rem;
    display: flex;
    textalign: center;
    justify-content: center;
    color: #574646;
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    font-size: 1.2rem;
    margin: 4px;
  }

  .item-last {
    align-self: flex-end;
  }

  .bt {
    font-size: 1rem;
    border: 2px solid #c07f00;
    border-radius: 4px;
    background-color: #c07f00;
    color: white;
    text-align: center;
    padding: 6px 8px;
    margin: 4px;
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
`;

export default ViewSingleStore;

import React, { useEffect, useState } from "react";
import StoreService from "../Service/StoreService";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../Context/GlobalContext";
import styled from "styled-components";

const ViewStores = () => {
  const { myUserId, setMyStoreId } = useUserContext();
  const location = useLocation();
  const data = location.state;
  let userId = data.userId;
  if (!data.userId) {
    userId = myUserId;
  }
  const [store, setStore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await StoreService.getStoresByUserId(userId);
      setStore(res.data);
      //  console.log(res.data);
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <h2>Store List</h2>

        <div className="">
          <table className="">
            <thead>
              <tr>
                <th>Store Number</th>
                <th>Store Status</th>
                <th>Store Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {store.map((store) => (
                <tr key={store.storeNumber}>
                  <td>{store.storeNumber}</td>
                  <td>{store.storeStatus}</td>
                  <td>{store.storeType}</td>
                  <td>
                    <Link
                      to="/store"
                      state={{ storeNumber: store.storeNumber, userId: userId }}
                    >
                      <button className="bt">View</button>
                    </Link>
                    <Link
                      to="/updateStore"
                      state={{ storeNumber: store.storeNumber, userId: userId }}
                    >
                      <button className="bt">Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    //border: 2px solid black;
    padding-top: 2px;
   // padding-bottom: 10px;
    background-color: rgb(255, 247, 225);
    min-height: 75vh;
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
  table {
    border: 2px solid #574646;
    margin-bottom:20px;
  }
  th {
    border: 2px solid #574646;
    padding: 7px;
  }
  td {
    border: 2px solid #574646;
  }
`;

export default ViewStores;

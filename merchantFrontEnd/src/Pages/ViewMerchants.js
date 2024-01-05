import React, { useState, useEffect } from "react";

import MerchantService from "../Service/MerchantService";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../Context/GlobalContext";
import styled from "styled-components";

function ViewMerchants() {
  const { myUserId } = useUserContext();
  const location = useLocation();
  const data = location.state;
  let userId = data?.userId;
  if (!data.userId) {
    userId = myUserId;
  }
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    MerchantService.getMerchantsByUserId(userId).then((res) => {
      setMerchants(res.data);
      //console.log(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <h2 className="title">Merchant List</h2>

        <div className="">
          <table className="">
            <thead>
              <tr>
                <th>Merchant name</th>
                <th>Merchant address</th>
                <th>Merchant phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.merchantId}>
                  <td>{merchant.merchantName}</td>
                  <td>{merchant.merchantAddress}</td>
                  <td>{merchant.merchantPhone}</td>
                  <td>
                    <Link
                      to="/viewMerchant"
                      state={{ merchantId: merchant.merchantId }}
                    >
                      <button className="bt">View</button>
                    </Link>

                    <Link
                      to="/updateMerchant"
                      state={{
                        merchantId: merchant.merchantId,
                        userId: userId,
                      }}
                    >
                      <button className="bt" style={{ marginLeft: "10px" }}>
                        Update
                      </button>
                    </Link>

                    <Link
                      to="/changeStore"
                      state={{
                        merchantId: merchant.merchantId,
                        store: merchant.store,
                      }}
                    >
                      <button className="bt" style={{ marginLeft: "10px" }}>
                        Change Store
                      </button>
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
}
const Wrapper = styled.section`
  .container {
    //border: 2px solid black;
    padding-top: 2px;
    background-color: rgb(255, 247, 225);
    min-height: 80vh;
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
    margin-bottom: 2px;
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
  }
  th {
    border: 2px solid #574646;
    padding: 7px;
  }
  td {
    border: 2px solid #574646;
  }
`;

export default ViewMerchants;

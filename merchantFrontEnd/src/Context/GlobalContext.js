import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();
export const GlobalContext = ({ children }) => {
  const [myUser, setMyUser] = useState();
  const [myUSerId, setMyUserId] = useState();
  const [myMerchantId, setMyMerchantId] = useState();
  const [myStoreId, setMyStoreId] = useState();


  const newStoreId =(id)=>{
    setMyStoreId(id)
  }

  return (
    <UserContext.Provider
      value={{
        myUser,
        setMyUser,
        myUSerId,
        setMyUserId,
        myMerchantId,
        setMyMerchantId,
        myStoreId,
        setMyStoreId,
        newStoreId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};

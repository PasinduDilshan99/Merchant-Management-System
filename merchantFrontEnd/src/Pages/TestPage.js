import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import ViewMerchants from "../Component/ViewMerchants";
import { UpdateMerchant } from "../Component/UpdateMerchant";
import DetailsMerchant from "../Component/DetailsMerchant";
import ViewStores from "../Component/ViewStores";
import ViewSingleStore from "../Component/ViewSingleStore";
import UpdateStore from "../Component/UpdateStore";

const TestPage = () => {
  return (
    <>
      <Navbar />
     <UpdateStore/>
      <Footer />
    </>
  );
};

export default TestPage;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { AboutPage } from "./Pages/AboutPage";
import Error from "./Pages/Error";
import SharedLayout from "./Pages/SharedLayout";
import { ContactUs } from "./Pages/ContactUs";
import { LoginComponent } from "./Pages/LoginComponent";
import { SignupPage } from "./Pages/SignupPage";
import ViewMerchantById from "./Pages/ViewMerchantById";
import { LoginHome } from "./Pages/LoginHome";
import { CreatePage } from "./Pages/CreatePage";
import ViewMerchants from "./Pages/ViewMerchants";
import ViewStores from "./Pages/ViewStores";
import { UpdateMerchant } from "./Pages/UpdateMerchant";
import ChangeStore from "./Pages/ChangeStore";
import { Questions } from "./Pages/Questions";
import ViewSingleStore from "./Pages/ViewSingleStore";
import UpdateStore from "./Pages/UpdateStore";
import ViewMerchantForAll from "./Pages/ViewMerchantForAll";
import { ResetPassword } from "./Pages/ResetPassword";
import PasswordChange from "./Pages/PasswordChange";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="loginMenu" element={<LoginHome />} />
          <Route path="viewMerchant" element={<ViewMerchantById />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="merchants" element={<ViewMerchants />} />
          <Route path="stores" element={<ViewStores />} />
          <Route path="viewMerchant" element={<ViewMerchantById />} />
          <Route path="updateMerchant" element={<UpdateMerchant />} />
          <Route path="changeStore" element={<ChangeStore />} />
          <Route path="store" element={<ViewSingleStore />} />
          <Route path="updateStore" element={<UpdateStore />} />
          <Route path="merchant" element={<ViewMerchantForAll />} />
          <Route path="questions" element={<Questions />} />
          <Route path="passwordChange" element={<PasswordChange />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import axios from "axios";

const MERCHANT_API_BASE_URL = "http://localhost:8080/merchant";
class MerchantService {
  getAllMerchants() {
    return axios.get(MERCHANT_API_BASE_URL + "/getAll");
  }
  getMerchantsByUserId(userId) {
    return axios.get(MERCHANT_API_BASE_URL + "/all/" + userId);
  }

  getMerchantById(merchantId) {
    return axios.get(MERCHANT_API_BASE_URL + "/" + merchantId);
  }

  addMerchant(theMerchant) {
    return axios.post(MERCHANT_API_BASE_URL, theMerchant);
  }

  updateMerchant(theMerchant) {
    return axios.put(MERCHANT_API_BASE_URL, theMerchant);
  }

  changeMerchantStore(theMerchantId, theStoreNumber) {
    return axios.put(
      MERCHANT_API_BASE_URL +
        "/changeStore?theMerchantId=" +
        theMerchantId +
        "&theStoreNumber=" +
        theStoreNumber
    );
  }
}

export default new MerchantService();

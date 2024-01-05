import axios from "axios";

const STORE_API_BASE_URL = "http://localhost:8080/store";
class StoreService {
  getStoresByUserId(userId) {
    return axios.get(STORE_API_BASE_URL + "/all/" + userId);
  }

  getStoreById(theStoreNumber) {
    return axios.get(STORE_API_BASE_URL + "/" + theStoreNumber);
  }

  updateStore(theStore) {
    return axios.put(STORE_API_BASE_URL + "/" , theStore);
  }
}

export default new StoreService();

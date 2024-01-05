import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";
class UserService {
  loginUser(loginUser) {
    return axios.post(USER_API_BASE_URL + "/login", loginUser);
  }

  findUserIdByUserName(theName) {
    return axios.get(USER_API_BASE_URL + "/userName/" + theName);
  }

  findUserByUserId(theId) {
    return axios.get(USER_API_BASE_URL + "/userId/" + theId);
  }
  addUser(user) {
    return axios.post(USER_API_BASE_URL + "/signup", user);
  }

  findByName(theName) {
    return axios.get(USER_API_BASE_URL + "/" + theName);
  }

  changePassword(theChangePassword) {
    return axios.put(USER_API_BASE_URL + "/changePassword", theChangePassword);
  }

  resetPassword(theResetPassword) {
    return axios.put(USER_API_BASE_URL + "/resetPassword", theResetPassword);
  }
}

export default new UserService();

import axios from "axios";

const QUESTION_API_BASE_URL = "http://localhost:8080/questions";
class QuestionService {
  addQuestions(theUserName, theQuestion) {
    return axios.put(QUESTION_API_BASE_URL + "/" + theUserName, theQuestion);
  }
}

export default new QuestionService();

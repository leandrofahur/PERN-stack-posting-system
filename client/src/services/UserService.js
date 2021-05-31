import api from "../api/axios";

class UserService {
  create(payload) {
    return api.post("/user/register", payload);
  }
  get(payload) {
    return api.post("/user/login", payload);
  }
}

export default new UserService();

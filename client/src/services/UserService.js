import api from "../api/axios";

class UserService {
  create(data) {
    return api.post("/user/register", data);
  }
}

export default new UserService();

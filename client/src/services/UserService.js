import api from "../api/axios";

class UserService {
  create(payload) {
    return api.post("/user/register", payload);
  }
  get(payload) {
    return api.post("/user/login", payload);
  }
  verify(token) {
    return api.get("/user/verify", {
      headers: {
        token: token,
      },
    });
  }
}

export default new UserService();

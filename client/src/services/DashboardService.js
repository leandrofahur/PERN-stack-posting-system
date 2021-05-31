import api from "../api/axios";

class DashboardService {
  getName(token) {
    return api.get("/dashboard/", {
      headers: { token },
    });
  }
}

export default new DashboardService();

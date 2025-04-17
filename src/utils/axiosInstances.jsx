import axios from 'axios'

const api = axios.create({
  baseURL: "https://rencana-app-server.onrender.com",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axios.post("https://rencana-app-server.onrender.com/users/refresh-token", {}, { withCredentials: true });

        return api(error.config);
      } catch (error) {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
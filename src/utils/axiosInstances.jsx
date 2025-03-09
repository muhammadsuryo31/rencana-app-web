import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axios.post("http://localhost:3000/users/refresh-token", {}, { withCredentials: true });

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
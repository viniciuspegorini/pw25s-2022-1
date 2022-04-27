import axios from "axios";

const signup = (user) => {
  return axios.post("/users", user);
};

const login = (user) => {
  return axios
    .post("/login", user)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    })
    .catch(() => {
      return "Login failed";
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return ''; //JSON.parse(localStorage.getItem("user"));
};

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};

export default AuthService;

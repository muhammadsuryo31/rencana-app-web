import { api } from "../src/utils";

const register = async(newUser) => {
  await api.post('users/register', newUser);
};

const login = async(loginData) => {
  await api.post('users/login', loginData)
};

const logout = async() => {
  await api.post('users/logout');
}

export { register, login,logout };

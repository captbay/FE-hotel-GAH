import { axios } from "./axios";

export const login = (username, password) => {
  return axios.post("/auth/login", { username, password });
};

export const register = ({
  username,
  password,
  name,
  email,
  no_identitas,
  no_phone,
  address,
}) => {
  return axios.post("/auth/register", {
    username,
    password,
    name,
    email,
    no_identitas,
    no_phone,
    address,
  });
};

export const logout = (token) => {
  return axios.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllKamar = (token) => {
  return axios.get("/kamar/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKamarById = (token, id) => {
  return axios.get(`/kamar/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

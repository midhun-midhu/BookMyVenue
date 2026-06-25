import api from "./api";


export const registerUser = async (userData) => {

  const response = await api.post(
    "auth/register/",
    userData
  );

  return response.data;
};


export const loginUser = async (userData) => {

  const response = await api.post(
    "token/",
    userData
  );

  return response.data;
};
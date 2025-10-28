// not implemented, currently Stretch Goal
import axiosClient from "./axiosConfig";

export const setup2FA = async () => {
  const { data } = await axiosClient.get("/auth/2fa/setup/");
  return data;
};

export const confirm2FA = async (token) => {
  const { data } = await axiosClient.post("/auth/2fa/confirm/", { token });
  return data;
};

export const disable2FA = async (password) => {
  const { data } = await axiosClient.post("/auth/2fa/disable/", { password });
  return data;
};

export const verify2FA = async (email, token) => {
  const { data } = await axiosClient.post("/auth/2fa/verify/", {
    email,
    token,
  });
  return data;
};

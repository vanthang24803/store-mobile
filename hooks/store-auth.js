import { create } from "zustand";
import api from "../app/utils/api";

const authStore = create((set, get) => ({
  user: null,
  token: "",
  isLogin: false,
  login: async (email, password) => {
    try {
      const response = await api.post(
        "/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        set({
          isLogin: true,
          token: response.data.token,
          user: response.data.user,
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default authStore;

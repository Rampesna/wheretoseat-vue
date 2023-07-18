import { defineStore } from "pinia";
import NetworkManager from "@/core/NetworkManager";
import ApiConstants from "@/core/ApiConstants";
import { toast } from "vue3-toastify";
import router from "@/router";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', user);
    },
    async logout() {
      await NetworkManager.post(ApiConstants.LOGOUT);
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      await router.push({ name: "login" });
    },
    async login(email, password) {
      const response = await NetworkManager.post(ApiConstants.LOGIN, {
        email: email,
        password: password
      });
      if (response.status === 200) {
        const data = response.data.data;
        this.setToken(data.token);
        this.setUser(data.user);
        toast.success("Giriş başarılı", {
          onClose: () => {
            router.push({ name: "dashboard" });
          }
        });
      } else {
        toast.error("Kullanıcı adı veya şifre hatalı");
      }
    }
  }

});

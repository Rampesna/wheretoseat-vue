import axios from 'axios';
import ApiConstants from '@/core/ApiConstants';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/store/authStore';

axios.defaults.withCredentials = true;

const apiClient = axios.create({
    baseURL: ApiConstants.BASE_URL,
    timeout: 5000,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 500; // default
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
            config.headers['Authorization'] = `Bearer ${authStore.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            toast.error('Ağ Hatası');
            return Promise.reject(error);
        }

        const url = error.config.url;
        if (error.response.status === 401 && url !== ApiConstants.BASE_URL + ApiConstants.LOGIN) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }

        return Promise.reject(error);
    }
);

const NetworkManager = {
    async get(url, params = {}) {
        return await apiClient.get(url, { params });
    },

    async post(url, data = {}, headers = {}) {
        return await apiClient.post(url, data, headers);
    },

    async put(url, data = {}) {
        return await apiClient.put(url, data);
    },

    async delete(url) {
        return await apiClient.delete(url);
    }
};

export default NetworkManager;

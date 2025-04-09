import axios from "axios";
import {AUTH_TOKEN, REFRESH_TOKEN} from "../constant/Constant.js";

const API_URL = 'http://localhost:8080/user-manager/api/v1/user';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (token && token !== 'undefined') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data && typeof config.data === 'object') {
            config.data = JSON.stringify(config.data);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// // Response interceptor (unchanged from previous examples)
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         // Token refresh logic...
//         return Promise.reject(error);
//     }
// );

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await api({method: "PUT", url:`${API_URL}/refresh-token`});
                console.log(response.data)
                const {token: newToken} = response.data;

                // localStorage.setItem(AUTH_TOKEN, newToken);

                api.defaults.headers.Authorization = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                processQueue(null, newToken);
                isRefreshing = false;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                localStorage.removeItem(AUTH_TOKEN);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (credentials) => {
    return await api({method: 'POST', url: `${API_URL}/login`, data: credentials});
}
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const getUserProfile = async () => {
    const response = await api({method: "GET", url: `${API_URL}/info`})
    return response.data;
}

// export default api;
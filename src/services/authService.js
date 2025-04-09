import api from "../api/ApiClient.js";

export const authService = {
    loginUser: async (credentials) => {
        return await api({method: 'POST', url: `/login`, data: credentials});
    },
    registerUser :async (userData) => {
        const response = await api({method: "POST",url: `/register`,data: userData});
        return response.data;
    },
    getUserProfile: async () => {
        const response = await api({method: "GET", url: `/info`})
        return response.data;
    }
}
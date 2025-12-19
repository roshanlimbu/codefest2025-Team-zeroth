import axios from 'axios';
const getBaseURL = () => {
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:8080`;
};

const axiosClient = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptor to include CSRF token in requests
axiosClient.interceptors.request.use((config) => {
    const csrfToken = localStorage.getItem("csrfToken");
    if (csrfToken) {
        config.headers["x-xsrf-token"] = csrfToken;
        console.log("[axiosClient] Adding CSRF token to request");
    }
    return config;
});

export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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

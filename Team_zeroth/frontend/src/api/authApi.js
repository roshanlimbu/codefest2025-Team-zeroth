import axiosClient from "./axiosClient";

export const registerUser = async ({ name, email, password }) => {
    console.log("Registering user:", { name, email, password });` `
    try {
        const res = await axiosClient.post("/register", { name, email, password });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const verifyOtp = async ({ email, otp }) => {
    try {
        const res = await axiosClient.post("/verifyOTP", { email, otp });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const res = await axiosClient.post("/login", { email, password });
        return res.data; // contains csrfToken
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const getProfile = async (csrfToken) => {
    try {
        const res = await axiosClient.get("/api/profile", {
            headers: { "x-xsrf-token": csrfToken },
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
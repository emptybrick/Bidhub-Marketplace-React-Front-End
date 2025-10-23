import axios from "axios";
import { getUser } from "./userService";

const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/bidhub/auth`;

const register = async (formData) => {
    try {
        await axios.post(`${ BASE_URL }/register/`, formData);

        // After successful registration, automatically log the user in
        const loginData = {
            email: formData.email,
            password: formData.password,
        };

        return await login(loginData);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const login = async (formData) => {
    try {
        const res = await axios.post(`${ BASE_URL }/login/`, formData);

        const data = await res.data;

        if (data.token) {
            localStorage.setItem("token", data.token);

            // Fetch the full user data from /auth/user
            const user = await getUser();

            if (!user) {
                throw new Error("Failed to fetch user data");
            }

            return user;
        }

        throw new Error("Invalid response from server");
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const toggleFavorite = async (itemId) => {
    try {
        const response = await axios.post(`${ BASE_URL }/user/favorites/toggle/`, {
            item_id: itemId,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getFavorites = async () => {
    try {
        const response = await axios.get(`${ BASE_URL }/user/favorites/`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getShippingInfo = async (itemId) => {
    try {
        const response = await axios.get(`${ BASE_URL }/user/items/${itemId}/shipping`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export { register, login, toggleFavorite, getFavorites, getShippingInfo };
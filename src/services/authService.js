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

export { register, login };
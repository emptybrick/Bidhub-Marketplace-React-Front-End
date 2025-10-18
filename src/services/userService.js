import axios from "./axiosConfig";

const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/bidhub/auth`;

const getUser = async () => {
    try {
        const res = await axios.get(`${ BASE_URL }/user/`);
        return res.data;
    } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        return null;
    }
};

export { getUser };

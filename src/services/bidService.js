import axios from "./axiosConfig";
const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/bidhub/marketplace`;

const createBid = async (itemId, Bid) => {
    try {
        const res = await axios.post(`${ BASE_URL }/${ itemId }/bids/new/`, Bid);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { createBid };
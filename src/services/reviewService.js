import axios from "./axiosConfig";
const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/bidhub/seller`;

const getReviews = async (sellerId, dateSort, ratingSort) => {
    try {
        const res = await axios.get(`${ BASE_URL }/${ sellerId }/reviews/`, {params: {dateSort: dateSort, ratingSort: ratingSort}});
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getReviewById = async (sellerId, id) => {
    try {
        const res = await axios.get(`${ BASE_URL }/${ sellerId }/reviews/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const updateReview = async (sellerId, id, Review) => {
    try {
        const res = await axios.put(`${ BASE_URL }/${ sellerId }/reviews/${ id }`, Review);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteReview = async (sellerId, id) => {
    try {
        await axios.delete(`${ BASE_URL }/${ sellerId }/reviews/${ id }`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createReview = async (sellerId, formData) => {
    try {
        const res = await axios.post(`${ BASE_URL }/${ sellerId }/reviews/new`, formData);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getReviews, getReviewById, updateReview, deleteReview, createReview };
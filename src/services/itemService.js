import axios from "./axiosConfig";
const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/bidhub/marketplace`;

const getItems = async () => {
    try {
        const res = await axios.get(`${ BASE_URL }/`);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getItemById = async (id) => {
    try {
        const res = await axios.get(`${ BASE_URL }/${ id }/`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const updateItem = async (id, Item) => {
    try {
        const res = await axios.put(`${ BASE_URL }/${ id }/`, Item);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteItem = async (id) => {
    try {
        await axios.delete(`${ BASE_URL }/${ id }/`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createItem = async (Item) => {
    try {
        const res = await axios.post(`${ BASE_URL }/new/`, Item);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getItems, getItemById, updateItem, deleteItem, createItem };
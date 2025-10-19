import axios from "./axiosConfig";
const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/api/books`;

const getBooks = async () => {
    try {
        const res = await axios.get(`${ BASE_URL }/`);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getBookById = async (id) => {
    try {
        const res = await axios.get(`${ BASE_URL }/${ id }/`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const updateBook = async (id, book) => {
    try {
        const res = await axios.put(`${ BASE_URL }/${ id }/`, book);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteBook = async (id) => {
    try {
        await axios.delete(`${ BASE_URL }/${ id }/`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createBook = async (book) => {
    try {
        const res = await axios.post(`${ BASE_URL }/`, book);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getBooks, getBookById, updateBook, deleteBook, createBook };

//------------------------------ AUTHORS GET

// import axios from "axios";
// const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL }/api/authors`;

// const getAuthors = async () => {
//     try {
//         const res = await axios.get(BASE_URL);
//         const data = await res.data;
//         return data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };

// export { getAuthors };

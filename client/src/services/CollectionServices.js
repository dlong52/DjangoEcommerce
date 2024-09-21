import axios from 'axios'
const axiosJwt = axios.create()
const getAllCollections = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/collection/all`)    
    return res.data
}
const getDetailCollection = async (id) => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/collection/detail/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching collection details:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
};
const createCollection = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/collection/create`, data)    
    return res.data
}
const updateCollection = async (id, data) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/collection/update/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error update user:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
const deleteCollection = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/collection/delete/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error delete collection:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
export {
    getAllCollections,
    createCollection,
    updateCollection,
    getDetailCollection,
    deleteCollection
}
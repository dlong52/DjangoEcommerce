import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const getAllProducts = async ({ queryKey }) => {
    const [_key, filters] = queryKey;

    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.category) params.append('category', filters.category);
    if (filters.collection) params.append('collection', filters.collection);
    if (filters.size) params.append('size', filters.size);
    if (filters.min_price) params.append('min_price', filters.min_price);
    if (filters.max_price) params.append('max_price', filters.max_price);
    if (filters.order_by) params.append('order_by', filters.order_by);
    if (filters.page) params.append('page', filters.page);
    if (filters.page_size) params.append('page_size', filters.page_size);
    if (typeof filters.status === 'boolean') {
        params.append('status', filters.status ? 'true' : 'false');
    }
    const res = await axios.get(`${import.meta.env.VITE_API}/product/all/?${params.toString()}`);
    return res.data;
}
const getDetailProduct = async (id, accessToken) => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/product/detail/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`, // Đảm bảo token được gửi với tiền tố Bearer
            },
            withCredentials: true,  // Cho phép gửi cookie nếu cần
        });

        return res.data;
    } catch (error) {
        console.error('Error fetching user details:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
};
const createProduct = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/product/create`, data)
    return res.data
}
const updateProduct = async (id, data) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/product/update/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error update user:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/product/delete/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error delete product:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
export {
    getAllProducts,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const createOrder = async (user_id, payment_method, username, phone_number, address) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/order/create`, {user_id, payment_method, username, phone_number, address});
    return res.data;
}
const getAllOrder = async (filters = {}, page = 1, pageSize = 10) => {
    const params = {
        ...filters,
        page,
        page_size: pageSize
    };
    const res = await axios.get(`${import.meta.env.VITE_API}/order/all`, { params });
    return res.data;
}

const getOrderDetail = async (order_id) => {
    const res = await axios.get(`${import.meta.env.VITE_API}/order/detail/${order_id}`);
    return res.data;
}
const getAllOrderByUser = async (user_id, filters = {}) => {
    // Tạo đối tượng tham số truy vấn từ filters
    const params = new URLSearchParams(filters).toString();
    const url = `${import.meta.env.VITE_API}/order/all-order-user/${user_id}/`;

    const res = await axios.get(`${url}?${params}`);
    return res.data;
};

const updateOrderStatus = async (order_id, new_status, payment_status ) => {
    const res = await axios.put(`${import.meta.env.VITE_API}/order/update/${order_id}/`, {
        status: new_status,
        payment_info: {
            payment_status: new_status,
        }
    });
    return res.data;
}
const createPayPalPayment = async (total_amount, order_id) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/payment/create/`, {
        total_amount,
        order_id,
    });
    return res.data;
};
const executePayment = async (paymentId, payerId) => {
    const response = await axios.post(`${import.meta.env.VITE_API}/payment/execute/`, {
        paymentId,
        payerId,
    });
    return response.data;
};


export {
    createOrder,
    getAllOrder,
    getAllOrderByUser,
    getOrderDetail,
    updateOrderStatus,
    createPayPalPayment,
    executePayment
}
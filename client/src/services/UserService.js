import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const signIn = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/sign-in`, data)    
    return res.data
}
const signUp = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/sign-up`, data)
    return res.data
}
const getDetailUser = async (id, accessToken) => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/user/detail/${id}`, {
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
const updateUser = async (id) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/user/update/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error update user:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}

const refreshToken = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API}/refresh-token`,document.cookie, {
        withCredentials: true,
    })
    console.log("response from server", res);
    return res.data
}
const logoutUser = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API}/log-out`,{
        withCredentials: true,
    })
    return res.data
}
export {
    signIn,
    signUp,
    getDetailUser,
    refreshToken,
    axiosJwt,
    logoutUser,
    updateUser
}
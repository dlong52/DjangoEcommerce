import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const signIn = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/sign-in`, data,{
        withCredentials: true
    })    
    return res.data
}
const signUp = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/sign-up`, data)
    return res.data
}
const createUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/create`, data)
    return res.data
}
const deleteUser = async (user_id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API}/user/delete/${user_id}`)
    return res.data
}
const getAllUsers = async () => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/user/all`);
        return res.data;
    } catch (error) {
        console.error('Error fetching all users:', error.response || error.message);
        throw error; 
    }
}
const getDetailUser = async (id, accessToken) => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/user/detail/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`, 
            },
            withCredentials: true,  
        });
        
        return res.data;
    } catch (error) {
        console.error('Error fetching user details:', error.response || error.message);
        throw error; 
    }
};
const updateUser = async (id, data) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/user/update/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error update user:', error.response || error.message);
        throw error; 
    }
}

const refreshToken = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/refresh_token`,document.cookie, {
        withCredentials: true,
    })
    console.log("response from server", res);
    return res.data
}
const logoutUser = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user/logout`,{ 
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
    updateUser,
    getAllUsers,
    createUser,
    deleteUser
}
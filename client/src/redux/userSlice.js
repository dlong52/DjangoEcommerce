import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: "",
    email: "",
    address: "",
    phone_number: "",
    accessToken: "",
    isLoading: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { username, email, phone_number, address, accessToken } = action.payload

            state.username = username || email;
            state.email = email;
            state.address = address
            state.phone_number = phone_number
            state.accessToken = accessToken
        },
        resetUser: (state) => {
            state.username = ""
            state.email = ""
            state.address = ""
            state.phone_number = ""
            state.accessToken = ""
        }
    }
})
export const { updateUser, resetUser } = userSlide.actions
export default userSlide.reducer
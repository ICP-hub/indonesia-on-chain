import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    emailId: "",
    userName: "",
    name: "",
    phone: "",
    role: "No Role",
    isUserPresent: false,
    userInfo: null,
    userInfoError: null
}


export const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { emailId, name, userName, phone, role } = action.payload;
            // console.log("Data recieved in  User Login", action.payload);
            state.emailId = emailId;
            state.userName = userName;
            state.name = name;
            state.phone = phone;
            state.role = role;
        },
        setIsPresent: (state, action) => {
            const { isUserPresent } = action.payload;
            state.isPresent = isUserPresent;
        },
        setUserInfoSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.userInfoError = null;
        },
        setUserInfoFail: (state, action) => {
            state.userInfoError = action.payload;
            state.userInfo = null;
        },
        clearUser: (state, action) => {
            state.emailId = "";
            state.userName = "";
            state.name = "";
            state.phone = "";
            state.role = "No Role";
            state.isPresent = false;
        }

    }
})

export const { setUser, setIsPresent, clearUser, setUserInfoSuccess, setUserInfoFail } = users.actions;
export default users.reducer;
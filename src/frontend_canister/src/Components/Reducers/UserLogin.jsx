import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    emailId: "",
    userName: "",
    name: "",
    phone: "",
    role: "No Role",
    isUserPresent: false,
}


export const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { emailId, name, userName, phone, role } = action.payload;
            console.log("Data recieved in  User Login", action.payload);
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

export const { setUser, setIsPresent,clearUser } = users.actions;
export default users.reducer;
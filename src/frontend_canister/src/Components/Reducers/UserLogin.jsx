import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    emailId:"",
    userName: "",
    name:"",
    phone:"",
    role:"No Role",
    isUserPresent:false,
}


export const users = createSlice({
    name:"users",
    initialState,
    reducers: {
        setUser: (state,action) =>{
            const {email,name,username,phone,role} = action.payload;
            state.emailId = email;
            state.userName = username;
            state.name = name;
            state.phone = phone;
            state.role = role;
        },
        setIsPresent: (state,action) =>{
            const {isPresent} = action.payload;
            state.isPresent = isPresent; 
        }

    }
})

export const {setUser,setIsPresent} = users.actions;
export default users.reducer;
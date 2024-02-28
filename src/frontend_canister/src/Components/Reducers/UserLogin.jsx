import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    emailId:"",
    userName: "",
    phone:"",
    role:"",
}


export const users = createSlice({
    name:"users",
    initialState,
    reducers: {
        setUser: (state,action) =>{
            const {emailId,name,Phone,Role} = action.payload;
            state.emailId = emailId;
            state.userName = name;
            state.phone = Phone;
            state.role = Role;
        }
    }
})

export const {setUser} = users.actions;
export default users.reducer;
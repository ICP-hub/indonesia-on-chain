import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    studentPageTitle: "Student Dashboard",
    educatorPageTitle: "Educator Dashboard",
    isMobileNav: false
}
const utility = createSlice({
    name: "utility",
    initialState,
    reducers: {
        setStudentPageTitle: (state, action) => {
            state.studentPageTitle = action.payload;
            console.log(state.studentPageTitle);
        },
        setEducatorPageTitle: (state, action) => {
            state.educatorPageTitle = action.payload;
            console.log(state.educatorPageTitle);
        },
        setMobileNav: (state, action) => {
            // console.log("setting changed", action.payload);
            state.isMobileNav = action.payload;
        }
    }
});

export const { setEducatorPageTitle, setStudentPageTitle, setMobileNav } = utility.actions;
export default utility.reducer;
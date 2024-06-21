import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    show: false,
    text: '',
    type: 'danger',
}

const Alert = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state, action) => {
            // console.log(action);
            state.show = true;
            state.text = action.payload.text;
            state.type = action.payload.type;
        },
        hideAlert: (state, action) => {
            state.show = false;
            state.text = '';
            state.type = 'danger';
        }
    }
});


export const { showAlert, hideAlert } = Alert.actions;
export default Alert.reducer;
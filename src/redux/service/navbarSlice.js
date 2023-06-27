import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : true,
};

export const navbarSlice = createSlice({
    name : "navbar",
    initialState,
    reducers : {
        toggleNavbar: (state) => {
            state.isOpen = !state.isOpen;
          },
    }
})

export const {toggleNavbar} = navbarSlice.actions;
export default navbarSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contacts: [],
    searched: '',
};

export const contactSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {
        addContacts: (state, { payload }) => {
            state.contacts = payload;
        },
        setSearched: (state, { payload }) => {
            state.searched = payload;
        }
    }
})

export const { addContacts, setSearched } = contactSlice.actions;
export default contactSlice.reducer;
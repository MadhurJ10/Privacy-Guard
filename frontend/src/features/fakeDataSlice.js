import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [] // Holds all fake data entries
};

const fakeDataSlice = createSlice({
    name: "fakeDataSlice",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload; // Replace all data
        },
        addData: (state, action) => {
            state.data.push(action.payload); // Add new fake data entry
            // state.data = action.payload;
        },
        deleteData: (state, action) => {
            state.data = state.data.filter((item) => item._id !== action.payload);
        }
    }
});

export const { setData, addData , deleteData } = fakeDataSlice.actions;
export default fakeDataSlice.reducer;

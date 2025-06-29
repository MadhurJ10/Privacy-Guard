import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entries: [], // Initial state for vault entries
};

const vaultSlice = createSlice({
    name: "vaultSlice",
    initialState,
    reducers: {
        setVaultData: (state, action) => {
            state.entries = action.payload; // Replace or set new entries
        },
        addVaultEntry: (state, action) => {
            state.entries = [...state.entries, action.payload]; // Append a new entry
        },
    },
});

export const { setVaultData, addVaultEntry } = vaultSlice.actions;
export default vaultSlice.reducer;

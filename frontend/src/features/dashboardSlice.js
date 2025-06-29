import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], // Holds dashboard-related data
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.data = action.payload; // Replace the entire data array
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import fakeDataReducer from "../features/fakeDataSlice"; // Import your slice reducer
import  dashboardReducer  from "../features/dashboardSlice";
import vaultReducer from "../features/vaultSlice";
// import Vault from "../pages/Vault";



export const store = configureStore({
    reducer: {
        fakeData: fakeDataReducer,
        dashboard : dashboardReducer,
        vault : vaultReducer
        // Register the reducer
    }
});


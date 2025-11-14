import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import hotelReducer from "./HotelSlice";
import requestReducer from "./requestSlice";    

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    requests: requestReducer,
    
  },
});

export default store;

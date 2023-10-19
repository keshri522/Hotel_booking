import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./combinereducers";
const store = configureStore({
  reducer: {
    rootReducers,
  },
});
export default store;

// this is the store where i combine all the reducers once action will find the reducers it will update the state of the particular Reducers

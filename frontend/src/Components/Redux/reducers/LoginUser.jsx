import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  initialState: null,
  name: "userLogin",
  reducers: {
    loggedInUser: (state, action) => {
      return action.payload;
    },
    loggedOutUser: (state, action) => {
      return null;
    },
  },
});

// export the reducers and the action..
export const { loggedInUser, loggedOutUser } = UserReducer.actions;
export default UserReducer.reducer;

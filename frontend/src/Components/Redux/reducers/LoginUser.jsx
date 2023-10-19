import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  initialState: null,
  name: "userLogin",
  reducers: {
    loggedInUser: (state, action) => {
      console.log("Action Payload:", action.payload);
      return action.payload;
    },
    loggedOutUser: (state, action) => {
      console.log("Action Payload:", action.payload);
      return action.payload;
    },
  },
});

// export the reducers and the action..
export const { loggedInUser, loggedOutUser } = UserReducer.actions;
export default UserReducer.reducer;

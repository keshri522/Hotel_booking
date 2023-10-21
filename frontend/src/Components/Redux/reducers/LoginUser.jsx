import { createSlice } from "@reduxjs/toolkit";
const GetDatFromLocalStorage = () => {
  let data = localStorage.getItem("LoginUser");
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};
const UserReducer = createSlice({
  initialState: GetDatFromLocalStorage(),
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

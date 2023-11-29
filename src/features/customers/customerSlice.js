import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    updateName(state, action) {
      state.fullName = action.payload;
    },
    createCustomer(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalID = action.payload.nationalID;
      state.createdAt = action.payload.createdAt;
    },
  },
});

export const { updateName, createCustomer } = customerSlice.actions;
export default customerSlice.reducer;

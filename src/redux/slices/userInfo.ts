import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoState {
  username: string;
}

const initialState: UserInfoState = {
  username: localStorage.username || "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { changeUsername } = userInfoSlice.actions;

export default userInfoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoState {
  username: string;
  socketId: string | undefined;
}

const initialState: UserInfoState = {
  username: localStorage.username || "",
  socketId: undefined,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setSocketId(state, action: PayloadAction<string | undefined>) {
      state.socketId = action.payload;
    },
  },
});

export const { changeUsername, setSocketId } = userInfoSlice.actions;

export default userInfoSlice.reducer;

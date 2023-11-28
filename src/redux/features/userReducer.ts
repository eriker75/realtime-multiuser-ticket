import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  name: string;
}

const initialState: UserState = {
  id: 0,
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if(action.payload.id <= 0) {
        state.id = 0;
        state.name = action.payload.name;
      } else {
        state.id = action.payload.id;
        state.name = action.payload.name;
      }
    },
    unsetUser: (state) => {
      state.id = 0;
      state.name = "";
    }
  },
});

export const { 
  setUser,
  unsetUser,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

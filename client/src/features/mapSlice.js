import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nearbyPlaces: [],
  selected1: null,
  selected2: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      state.nearbyPlaces.push(action.payload);
    },
  },
});

export const { addPlace } = mapSlice.actions;
export default mapSlice.reducer;

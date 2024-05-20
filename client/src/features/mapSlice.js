import { position } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  nearbyPlaces: [],
  selected1: null,
  selected2: null,
  positions: [],
  radius: null,
  active: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      state.nearbyPlaces = action.payload;
    },
    addPositions: (state, action) => {
      state.positions = action.payload;
    },
    addRadius: (state, action) => {
      state.radius = action.payload;
    },
    addActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addPlace, addPositions, addRadius, addActive } =
  mapSlice.actions;
export default mapSlice.reducer;

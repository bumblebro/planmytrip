import { position } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  nearbyPlaces: [],
  selected1: null,
  selected2: null,
  positions: [],
  radius: 5000,
  active: false,
  selectedList: [],
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
    addList: (state, action) => {
      let run = false;
      const data = action.payload;
      state.selectedList.map((item) => {
      if (item.placeId === data.placeId) {
          run = true;
        }
      });
      if (run == true) {
        state.selectedList.push(action.payload);
      }
    },
  },
});

export const { addPlace, addPositions, addRadius, addActive, addList } =
  mapSlice.actions;
export default mapSlice.reducer;

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
  waypoint: [],
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
      state.selectedList.push(action.payload);
    },
    addnewList: (state, action) => {
      state.selectedList = action.payload;
    },
    addAdded: (state, action) => {
      let filterdPlaces = [];
      filterdPlaces = state.nearbyPlaces.map((item) => {
        if (item.placeid === action.payload) {
          return { ...item, added: true };
        }
        return item;
      });
      state.nearbyPlaces = filterdPlaces;
    },
    addRemoved: (state, action) => {
      let filterdPlaces = [];
      filterdPlaces = state.nearbyPlaces.map((item) => {
        if (item.placeid === action.payload) {
          return { ...item, added: false };
        }
        return item;
      });
      state.nearbyPlaces = filterdPlaces;
    },
    addselected1: (state, action) => {
      state.selected1 = action.payload;
    },
    addselected2: (state, action) => {
      state.selected2 = action.payload;
    },
    addwaypoint: (state, action) => {
      state.waypoint.push(action.payload);
    },
  },
});

export const {
  addPlace,
  addPositions,
  addRadius,
  addActive,
  addList,
  addnewList,
  addAdded,
  addRemoved,
  addselected1,
  addselected2,
  addwaypoint,
} = mapSlice.actions;
export default mapSlice.reducer;

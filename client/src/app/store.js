import { configureStore } from "@reduxjs/toolkit";
import mapreducer from "../features/mapSlice";

export const store = configureStore({
  reducer: mapreducer,
});

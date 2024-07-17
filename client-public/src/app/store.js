import { configureStore } from "@reduxjs/toolkit";
import { recommendationReducer } from "../features/recommendationSlice";

const store = configureStore({
  reducer: {
    recommendation: recommendationReducer
  }
})

export default store
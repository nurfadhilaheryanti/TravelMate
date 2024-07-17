import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  recommendations: []
}

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState, 
  reducers: {
    addRecommendation : (state, action) => {
      state.recommendations = action.payload
    }
  }
})

export const recommendationReducer = recommendationSlice.reducer

export const { addRecommendation } = recommendationSlice.actions
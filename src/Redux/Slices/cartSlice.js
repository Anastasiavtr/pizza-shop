import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'pizza',
  initialState: {},
  reducers: {
    setActiveCategory: (state, action) => {
      state.category = action.payload
    },
  },
})

export const {} = cartSlice.actions

export default cartSlice.reducer

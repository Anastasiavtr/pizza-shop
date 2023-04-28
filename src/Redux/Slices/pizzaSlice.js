import { createSlice } from '@reduxjs/toolkit'

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer

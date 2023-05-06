import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { fetchPizza } from './asyncActions'
import { PizzaItemType, StatusEnum } from './types'

interface PizzaSliceInterface {
  items: PizzaItemType[]
  status: StatusEnum
}

const initialState: PizzaSliceInterface = {
  items: [],
  status: StatusEnum.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItemType[]>) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = StatusEnum.LOADING
        state.items = []
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = StatusEnum.SUCCESS
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = StatusEnum.ERROR
        state.items = []
      })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer

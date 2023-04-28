import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './Slices/filterSlice'
import pizzaSlice from './Slices/pizzaSlice'
import cartSlice from './Slices/cartSlice'

export const store = configureStore({
  reducer: { filter: filterSlice, pizza: pizzaSlice, cart: cartSlice },
})

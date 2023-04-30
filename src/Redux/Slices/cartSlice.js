import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id &&
          item.type !== action.payload.type &&
          item.size !== action.payload.size
      )
    },

    minusItem: (state, action) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )
      findItem.count--
      state.totalPrice = state.totalPrice - action.payload.price
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer

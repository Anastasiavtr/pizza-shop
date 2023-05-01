import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, { payload }) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      )

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem: (state, { payload }) => {
      const findItem = state.items.find((item) => {
        return (
          item.id === payload.id &&
          item.size === payload.size &&
          item.type === payload.type
        )
      })

      state.totalPrice -= findItem.price * findItem.count
      state.items = state.items.filter((item) => item !== findItem)
    },

    minusItem: (state, { payload }) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      )
      findItem.count--
      state.totalPrice -= payload.price
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer

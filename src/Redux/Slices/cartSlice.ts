import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { CartItemType } from './types'

interface CartSliceInterface {
  totalPrice: number
  items: CartItemType[]
}

const initialState: CartSliceInterface = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItemType>) => {
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

      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem: (state, { payload }: PayloadAction<CartItemType>) => {
      const findItem = state.items.find((item) => {
        return (
          item.id === payload.id &&
          item.size === payload.size &&
          item.type === payload.type
        )
      })
      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count
        state.items = state.items.filter((item) => item !== findItem)
      }
    },

    minusItem: (state, { payload }: PayloadAction<CartItemType>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      )
      if (findItem) {
        findItem.count--
      }
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

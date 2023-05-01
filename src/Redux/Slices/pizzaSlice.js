import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async ({ category, search, currentPage, sort, sorting }) => {
    const { data } = await axios.get(
      `https://644683240431e885f0143b60.mockapi.io/items?page=${currentPage}${category}&limit=3&sortBy=${sort.type}${sorting}${search}`
    )

    return data
  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = 'loading'
        state.items = []
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success'
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = 'error'
        state.items = []
      })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer

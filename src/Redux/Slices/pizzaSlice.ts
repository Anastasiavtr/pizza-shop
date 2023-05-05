import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceInterface {
  items: PizzaItemType[]
  status: StatusEnum
}
export type PizzaItemType = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

export type SearchPizzaType = {
  category: string
  search: string
  currentPage: string
  sortType: string
  sorting: string
  sortingOrder: boolean
}

export const fetchPizza = createAsyncThunk<PizzaItemType[], SearchPizzaType>(
  'pizza/fetchPizzaStatus',
  async ({ category, search, currentPage, sortType, sorting }) => {
    const { data } = await axios.get<PizzaItemType[]>(
      `https://644683240431e885f0143b60.mockapi.io/items?page=${currentPage}&category=${category}&limit=3&sortBy=${sortType}${sorting}${search}`
    )

    return data
  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: <PizzaSliceInterface>{
    items: [],
    status: StatusEnum.LOADING,
  },
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

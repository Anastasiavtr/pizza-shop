import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { PizzaItemType, SearchPizzaType } from './types'

export const fetchPizza = createAsyncThunk<PizzaItemType[], SearchPizzaType>(
  'pizza/fetchPizzaStatus',
  async ({ category, search, currentPage, sortType, sorting }) => {
    const { data } = await axios.get<PizzaItemType[]>(
      `https://644683240431e885f0143b60.mockapi.io/items?page=${currentPage}${category}&limit=4&sortBy=${sortType}${sorting}${search}`
    )

    return data
  }
)

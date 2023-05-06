import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceInterface, SortPropertyEnum, SortType } from './types'

const initialState: FilterSliceInterface = {
  category: 0,
  currentPage: 1,
  searchValue: '',
  sortingOrder: false,
  sort: {
    name: 'популярности',
    type: SortPropertyEnum.RATING,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setSortingOrder: (state, action: PayloadAction<boolean>) => {
      state.sortingOrder = action.payload
    },

    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload
    },
    setFilter: (state, { payload }: PayloadAction<FilterSliceInterface>) => {
      state.sort = payload.sort
      state.category = Number(payload.category)
      state.currentPage = Number(payload.currentPage)
      state.sortingOrder = payload.sortingOrder
    },
  },
})

export const {
  setActiveCategory,
  setCurrentPage,
  setSearchValue,
  setSortingOrder,

  setSort,
  setFilter,
} = filterSlice.actions

export default filterSlice.reducer

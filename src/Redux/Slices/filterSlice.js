import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: 0,
    currentPage: 1,
    searchValue: '',
    sortingOrder: false,
    sort: {
      name: 'популярности',
      type: 'rating',
    },
    isLoading: true,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.category = action.payload
    },
    setCurrentPage: (state, action) => {
      state.category = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setSortingOrder: (state, action) => {
      state.sortingOrder = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
  },
})

export const {
  setActiveCategory,
  setCurrentPage,
  setSearchValue,
  setSortingOrder,
  setIsLoading,
  setSort,
} = filterSlice.actions

export default filterSlice.reducer

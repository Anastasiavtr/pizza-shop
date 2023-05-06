export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
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
export type CartItemType = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export type SortType = {
  name: string
  type: SortPropertyEnum
}

export interface FilterSliceInterface {
  category: number
  currentPage: number
  searchValue: string
  sortingOrder: boolean
  sort: SortType
}

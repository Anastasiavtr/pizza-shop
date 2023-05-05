import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  SortType,
  setActiveCategory,
  setCurrentPage,
  setFilter,
} from '../Redux/Slices/filterSlice'
import qs from 'qs'
import '../scss/app.scss'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { list } from '../components/Sort'
import Pagination from '../components/Pagination/Pagination'
import {
  PizzaItemType,
  SearchPizzaType,
  fetchPizza,
} from '../Redux/Slices/pizzaSlice'
import { useAppDispatch, useAppSelector } from '../AppHooks'

const Home: React.FC = () => {
  const { items, status } = useAppSelector((state) => state.pizza)
  const { currentPage, searchValue, sortingOrder, sort } = useAppSelector(
    (state) => state.filter
  )
  const activeCategory = useAppSelector((state) => state.filter.category)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value))
  }

  const onChangeCategory = (i: number) => {
    dispatch(setActiveCategory(i))
  }

  const getPizza = async () => {
    const category = activeCategory > 0 ? String(activeCategory) : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const sorting = sortingOrder ? `&order=asc` : `&order=desc`
    let sortType = sort.type

    dispatch(
      fetchPizza({
        category,
        search,
        currentPage: String(currentPage),
        sortType,
        sorting,
      } as SearchPizzaType)
    )
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          type: sort.type,
          category: activeCategory,
          currentPage,
          sortingOrder,
        },
        { addQueryPrefix: true }
      )

      navigate(queryString)
    }
    isMounted.current = true
  }, [activeCategory, sort, sortingOrder, currentPage])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaType
      let sort = list.find((obj) => obj.type === params.sortType) as SortType

      dispatch(
        setFilter({
          category: +params.category,
          searchValue: params.search || '',
          currentPage: Number(params.currentPage),
          sortingOrder: params.sortingOrder,
          sort: sort || list[0],
        })
      )
    }
    // isSearch.current = true
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    getPizza()
  }, [activeCategory, sort, sortingOrder, searchValue, currentPage])

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
  const pizzaArray = items.map((pizza: PizzaItemType) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={onChangeCategory}
        />
        <Sort sort={sort} sortingOrder={sortingOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Упс, что-то пошло не так. <span>😕</span>
          </h2>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzaArray}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home

import React, { useContext, useRef } from 'react'
import Categories from '../components/Categories'
import '../scss/app.scss'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import qs from 'qs'
import Sort, { list } from '../components/Sort'

import { useEffect, useState } from 'react'
import { UserContext } from '../App'
import Pagination from '../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentPage,
  setFilter,
  setIsLoading,
} from '../Redux/Slices/filterSlice'
import { setItems } from '../Redux/Slices/pizzaSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const items = useSelector((state) => state.pizza.items)

  const activeCategory = useSelector((state) => state.filter.category)
  const currentPage = useSelector((state) => state.filter.currentPage)
  const searchValue = useSelector((state) => state.filter.searchValue)
  const sortingOrder = useSelector((state) => state.filter.sortingOrder)
  const isLoading = useSelector((state) => state.filter.isLoading)
  const sort = useSelector((state) => state.filter.sort)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  // const [items, setItems] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // const [activeCategory, setActiveCategory] = useState(0)
  // const [currentPage, setCurrentPage] = useState(1)

  // const [sort, setSort] = useState({
  //   name: 'популярности',
  //   sort: 'rating',
  // })
  // const [sortingOrder, setSortingOrder] = useState(false)

  // const { searchValue } = useContext(UserContext)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
    console.log(number)
  }

  const fetchPizzas = () => {
    dispatch(setIsLoading(true))
    const category = activeCategory > 0 ? `&category=${activeCategory}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://644683240431e885f0143b60.mockapi.io/items?page=${currentPage}${category}&limit=3&sortBy=${
          sort.type
        }&order=${sortingOrder ? 'asc' : 'desc'}${search}`
      )
      .then((res) => {
        dispatch(setItems(res.data))
        dispatch(setIsLoading(false))
      })
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          type: sort.type,
          activeCategory,
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
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.type === params.type)
      dispatch(setFilter({ ...params, sort }))
    }
    isSearch.current = true
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [activeCategory, sort, sortingOrder, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          // setActiveCategory={() => dispatch(setActiveCategory)}
          activeCategory={activeCategory}
        />
        <Sort
          sort={sort}
          sortingOrder={sortingOrder}
          // setSortingOrder={setSortingOrder}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home

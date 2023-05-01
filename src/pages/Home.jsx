import React, { useContext, useRef } from 'react'
import Categories from '../components/Categories'
import '../scss/app.scss'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import qs from 'qs'
import Sort, { list } from '../components/Sort'
import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setFilter } from '../Redux/Slices/filterSlice'
import { fetchPizza } from '../Redux/Slices/pizzaSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { items, status } = useSelector((state) => state.pizza)
  const activeCategory = useSelector((state) => state.filter.category)
  const { currentPage, searchValue, sortingOrder, sort } = useSelector(
    (state) => state.filter
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizza = async () => {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const sorting = sortingOrder ? `&order=asc` : `&order=desc`

    dispatch(
      fetchPizza({
        category,
        search,
        currentPage,
        sort,
        sorting,
      })
    )
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
    getPizza()
  }, [activeCategory, sort, sortingOrder, searchValue, currentPage])

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
  const pizzaArray = items.map((pizza) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} />
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

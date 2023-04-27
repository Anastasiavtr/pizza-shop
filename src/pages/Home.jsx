import React, { useContext } from 'react'
import Categories from '../components/Categories'
import '../scss/app.scss'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

import Sort from '../components/Sort'

import { useEffect, useState } from 'react'
import { UserContext } from '../App'
import Pagination from '../components/Pagination/Pagination'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  })
  const [sortingOrder, setSortingOrder] = useState(false)

  const { searchValue } = useContext(UserContext)

  const onChangePage = (number) => {
    setCurrentPage(number)
  }

  useEffect(() => {
    setIsLoading(true)
    const category = activeCategory > 0 ? `&category=${activeCategory}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    fetch(
      `https://644683240431e885f0143b60.mockapi.io/items?page=${currentPage}${category}&limit=3&sortBy=${
        sortType.sort
      }&order=${sortingOrder ? 'asc' : 'desc'}${search}`
    ).then((res) =>
      res.json().then((data) => {
        setItems(data)
        setIsLoading(false)
      })
    )
  }, [activeCategory, sortType, sortingOrder, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <Sort
          sortType={sortType}
          setSortType={setSortType}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
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

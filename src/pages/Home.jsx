import React from 'react'
import Categories from '../components/Categories'
import '../scss/app.scss'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

import Sort from '../components/Sort'

import { useEffect, useState } from 'react'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://644683240431e885f0143b60.mockapi.io/items').then((res) =>
      res.json().then((data) => {
        setItems(data)
        setIsLoading(false)
      })
    )
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  )
}

export default Home

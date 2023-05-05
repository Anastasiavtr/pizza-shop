import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../assets/img/spinning-circles.svg'

const FullPizza: React.FC = () => {
  const params = useParams()
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: string
  }>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://644683240431e885f0143b60.mockapi.io/items/${params.id}`
        )
        setPizza(data)
      } catch (error) {
        alert('Такой страницы нет')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return (
      <div className="content__items">
        <img src={Spinner} alt="Spinner" />

        {/* <Spinner /> */}
      </div>
    )
  }
  return (
    <div className="container">
      <div className="content__items">
        <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{pizza.title}</h4>

          <div className="pizza-block__price">от {pizza.price} ₽</div>
        </div>
      </div>
    </div>
  )
}

export default FullPizza

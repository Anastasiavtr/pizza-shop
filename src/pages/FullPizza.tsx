import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const FullPizza: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: string
  }>()

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
    return <Loading />
  }
  return (
    <div className="container">
      <div className="content__items content__items--pizza">
        <div className="pizza-block">
          <img
            className="pizza-block__image pizza-block__image--big"
            src={pizza.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{pizza.title}</h4>

          <div className="pizza-block__price">от {pizza.price} ₽</div>
        </div>

        <Link to="/" className="button button--outline  go-back-btn">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  )
}

export default FullPizza

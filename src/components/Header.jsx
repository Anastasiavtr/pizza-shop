import React from 'react'
import logoSvg from '../assets/img/pizza-logo.svg'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Header = () => {
  const { items, totalPrice } = useSelector((state) => state.cart)
  const totalCount = items.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div className="header__text">
              <h1>React Pizza</h1>
              <p>Cамая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart button--cart--big">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <AiOutlineShoppingCart />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header

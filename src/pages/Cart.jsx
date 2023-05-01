import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearItems } from '../Redux/Slices/cartSlice'
import CartEmpty from '../components/CartEmpty'
import { AiFillDelete, AiOutlineShoppingCart } from 'react-icons/ai'

const Cart = () => {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector((state) => state.cart)
  const totalCount = items.reduce((sum, item) => {
    return sum + item.count
  }, 0)
  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems())
    }
  }

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <>
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <AiOutlineShoppingCart />
              Корзина
            </h2>
            <div onClick={onClickClear} className="cart__clear">
              <AiFillDelete />
              <span>Очистить корзину</span>
            </div>
          </div>

          <div className="content__items">
            {items.map((item) => {
              return (
                <CartItem {...item} key={item.id + item.type + item.size} />
              )
            })}
          </div>
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Всего пицц: <b>{totalCount} шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>{totalPrice} ₽</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

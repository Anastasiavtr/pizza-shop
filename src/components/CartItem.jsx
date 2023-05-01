import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../Redux/Slices/cartSlice'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const CartItem = ({ id, title, price, imageUrl, size, type, count }) => {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(addItem({ id, type, size }))
  }
  const onClickRemove = () => {
    dispatch(removeItem({ id, type, size }))
  }
  const onClickMinus = () => {
    if (count > 0) {
      dispatch(minusItem({ id, price, type, size }))
    } else {
      onClickRemove({ id, price, type, size })
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <AiOutlineMinus />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <button onClick={onClickRemove} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <AiOutlineClose />
        </div>
      </button>
    </div>
  )
}

export default CartItem

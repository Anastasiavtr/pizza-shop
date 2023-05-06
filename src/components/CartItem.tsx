import React from 'react'
import { addItem, minusItem, removeItem } from '../Redux/Slices/cartSlice'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useAppDispatch } from '../AppHooks'
import { CartItemType } from '../Redux/Slices/types'

type CartItemProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  size: number
  type: string
  count: number
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  size,
  type,
  count,
}) => {
  const dispatch = useAppDispatch()

  const onClickPlus = () => {
    dispatch(addItem({ id, type, size } as CartItemType))
  }
  const onClickRemove = () => {
    dispatch(removeItem({ id, type, size, price } as CartItemType))
  }
  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem({ id, price, type, size } as CartItemType))
    } else {
      dispatch(removeItem({ id, price, type, size } as CartItemType))
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

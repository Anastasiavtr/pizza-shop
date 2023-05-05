import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItemType, addItem } from '../../Redux/Slices/cartSlice'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../AppHooks'

export type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch()

  const cartItem = useAppSelector((state) =>
    state.cart.items.filter((obj: any) => obj.id === id)
  )
  const addedCount = cartItem.reduce((sum, item: any) => sum + item.count, 0)

  const type = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: type[activeType],
      size: sizes[activeSize],
      count: 0,
    }

    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((i) => {
            return (
              <li
                onClick={() => setActiveType(i)}
                key={i}
                className={activeType === i ? 'active' : ''}
              >
                {type[i]}
              </li>
            )
          })}
        </ul>
        <ul>
          {sizes.map((size, i) => {
            return (
              <li
                onClick={() => setActiveSize(i)}
                key={i}
                className={activeSize === i ? 'active' : ''}
              >
                {size} см.
              </li>
            )
          })}
        </ul>
      </div>
      <button className="pizza-block__bottom" onClick={onClickAdd}>
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add">
          <AiOutlinePlus />
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </button>
    </div>
  )
}

export default PizzaBlock

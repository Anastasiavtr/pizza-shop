import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveCategory, setCurrentPage } from '../Redux/Slices/filterSlice'

const Categories = ({ activeCategory }) => {
  const dispatch = useDispatch()

  const onChangeCategory = (i) => {
    dispatch(setActiveCategory(i))
    dispatch(setCurrentPage(1))
  }
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => {
          return (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={activeCategory === i ? 'active' : ''}
            >
              {value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories

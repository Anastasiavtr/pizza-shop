import React, { useState } from 'react'

const Categories = ({ setActiveCategory, activeCategory }) => {
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
              onClick={() => setActiveCategory(i)}
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

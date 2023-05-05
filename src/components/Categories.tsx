import React from 'react'

type CategoriesProps = {
  activeCategory: number
  onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  onChangeCategory,
}) => {
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

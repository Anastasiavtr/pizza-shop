import React, { useEffect, useRef, useState } from 'react'
import {
  SortPropertyEnum,
  SortType,
  setSort,
  setSortingOrder,
} from '../Redux/Slices/filterSlice'
import { useAppDispatch } from '../AppHooks'

export const list: SortType[] = [
  { name: 'популярности', type: SortPropertyEnum.RATING },
  { name: 'цене', type: SortPropertyEnum.PRICE },
  { name: 'алфавиту', type: SortPropertyEnum.TITLE },
]

type SortProps = {
  sort: SortType
  sortingOrder: boolean
}

const Sort: React.FC<SortProps> = ({ sort, sortingOrder }) => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  const onChangeSelectedList = (obj: SortType) => {
    dispatch(setSort(obj))
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          onClick={() => {
            dispatch(setSortingOrder(!sortingOrder))
          }}
          transform={!sortingOrder ? 'rotate(-180 0 0)' : ''}
          width="15"
          cursor="pointer"
          height="16"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => {
              return (
                <li
                  key={i}
                  onClick={() => onChangeSelectedList(obj)}
                  className={sort.name === obj.name ? 'active' : ''}
                >
                  {obj.name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort

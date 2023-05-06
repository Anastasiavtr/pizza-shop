import React, { useCallback, useRef, useState } from 'react'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../Redux/Slices/filterSlice'
import debounce from 'lodash.debounce'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value))
    }, 500),
    []
  )
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      <AiOutlineSearch />
      {value && (
        <span onClick={onClickClear} className={styles.clearIcon}>
          <AiOutlineClose />
        </span>
      )}
    </div>
  )
}

export default Search

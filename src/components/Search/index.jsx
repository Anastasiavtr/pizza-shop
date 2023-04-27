import React, { useContext } from 'react'
import styles from './Search.module.scss'
import { UserContext } from '../../App'

const Search = () => {
  const { searchValue, setSearchValue } = useContext(UserContext)
  return (
    <input
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
      className={styles.input}
      placeholder="Поиск пиццы..."
    />
  )
}

export default Search

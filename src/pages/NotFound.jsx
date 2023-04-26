import React from 'react'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <span>😞</span>
      <h1>Ничего не найдено.</h1>
    </div>
  )
}

export default NotFound

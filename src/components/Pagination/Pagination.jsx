import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={4}
        forcePage={currentPage - 1}
      />
    </>
  )
}

export default Pagination

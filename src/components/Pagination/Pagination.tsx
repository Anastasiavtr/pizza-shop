import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationTypes = {
  currentPage: number
  onChangePage: (page: number) => void
}
const Pagination: React.FC<PaginationTypes> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
      />
    </>
  )
}

export default Pagination

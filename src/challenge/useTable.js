import { useState } from 'react'

export const useTable = (rows, startingPage, displayedRows) => {
  const [currentpage, setPage] = useState(startingPage)
  const [rowsPerPage] = useState(displayedRows)

  const indexOfLastRow = currentpage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(rows.length / rowsPerPage)
  const numberOfPage = Array.from({ length: totalPages }, (_, i) => i + 1)

  const doPaginate = pageNumber => setPage(pageNumber)
  const doPrev = () => {
    if (currentpage > 1) {
      setPage(currentpage - 1)
    }
  }
  const doNext = () => {
    if (currentpage < totalPages) {
      setPage(currentpage + 1)
    }
  }

  return { rowsPerPage, currentRows, totalPages, numberOfPage, currentpage, doPaginate, doPrev, doNext }
}

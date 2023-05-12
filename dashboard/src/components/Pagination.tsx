import React, { useEffect, useRef } from 'react'

type PaginationProps = {
  nPages: number, 
  nOfJobs: number,
  currentPage: number, 
  nPagesList: number[],
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  children: React.ReactNode
}

export const Pagination = ({...props}: PaginationProps) => {

  const nextPage = (event:any) => {
    if (props.currentPage !== props.nPages) props.setCurrentPage(props.currentPage + 1)
    event.preventDefault()

  }
  const prevPage = (event:any) => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1)
    event.preventDefault()
  }

  return (

    <div>
      {props.children}
    <nav>
      <ul className='pagination justify-content-center'>
        <li className="page-item">
          <a className="page-link"
            onClick={prevPage}
            href='#'>
            Previous
          </a>
        </li>
        {props.nPagesList.map(pgNumber => (
          <li key={pgNumber}
            className={`page-item ${props.currentPage == pgNumber ? 'active' : ''} `} >
            <a onClick={(event:any) => {props.setCurrentPage(pgNumber); event.preventDefault()}}
              className='page-link'
              href='#'>
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link"
            onClick={nextPage}
            id="Next"
            href='#'>
            Next
          </a>
        </li>
      </ul>
    </nav>
    </div>
  )
  
}
import React from "react"
import { Link } from "react-router-dom"

const Paginator = props => {
  const { page, maxPage, hasMore, type, prevPage, nextPage } = props

  return (
    <div
      className="py-2 py-4 text-center bg-white fixed pin-x border-b"
      style={{ top: "55px", zIndex: "998" }}>
      {page > 1 ? (
        <Link
          to={"/" + type + "/" + (page - 1)}
          onClick={prevPage}
          className="no-underline mx-3">
          <span> &lt; prev</span>
        </Link>
      ) : (
        <a style={{ color: "#ccc" }} className="mx-3">
          <span> &lt; prev</span>
        </a>
      )}

      <span>
        {" "}
        {page}/{maxPage ? maxPage : null}
      </span>

      {hasMore ? (
        <Link
          to={"/" + type + "/" + (page + 1)}
          onClick={nextPage}
          className="no-underline mx-3">
          <span>more &gt;</span>
        </Link>
      ) : (
        <a style={{ color: "#ccc" }} className="mx-3">
          <span>more &gt;</span>
        </a>
      )}
    </div>
  )
}

export default Paginator

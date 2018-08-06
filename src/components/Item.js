import React from "react"
import { getHost, diffForHumans } from "../utils/helpers"
import { Link } from "react-router-dom"

const Item = ({ item, hostRef }) => {
  return (
    <li className="news-item" ref={hostRef}>
      <span className="score text-base-color">{item.score}</span>

      <span className="news-title">
        {item.url ? (
          <React.Fragment>
            <a
              href={item.url}
              target="_blank"
              rel="noopener"
              className="no-underline">
              {item.title}
            </a>
            <span className="news-url"> ({getHost(item.url)})</span>
          </React.Fragment>
        ) : (
          <Link className="no-underline" to={`/item/${item.id}`}>
            {item.title}
          </Link>
        )}
      </span>

      <br />

      <span className="news-meta">
        {item.type !== "job" && (
          <React.Fragment>
            by <span className="user underline cursor-pointer"> {item.by}</span>
          </React.Fragment>
        )}

        <span className="time"> {diffForHumans(item.time)} ago</span>

        {item.type !== "job" && (
          <React.Fragment>
            {" "}
            |{" "}
            <Link
              to={`/item/${item.id}`}
              className="news-comments underline cursor-pointer hover:text-base-color">
              <span>{item.descendants} comments</span>
            </Link>
          </React.Fragment>
        )}
      </span>
    </li>
  )
}

export default Item

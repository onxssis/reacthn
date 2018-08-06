import React from "react"
import { NavLink } from "react-router-dom"
import LoadingBar from "react-redux-loading-bar"

const Header = () => {
  return (
    <header className="bg-base-color fixed pin-l pin-r pin-t z-50">
      <LoadingBar style={{ backgroundColor: "#fcce53" }} />

      <nav className="container inner flex items-center py-3 px-4">
        <NavLink to="/" activeClassName="selected" className="mr-5 text-white">
          <i className="fab fa-2x fa-hacker-news" />
        </NavLink>

        <div className="inner-links flex-1">
          <NavLink
            to="/top"
            activeClassName="selected"
            className="mr-2 font-normal hover:text-white no-underline">
            Top
          </NavLink>

          <NavLink
            to="/new"
            activeClassName="selected"
            className="mr-2 font-normal hover:text-white no-underline">
            New
          </NavLink>

          <NavLink
            to="/show"
            activeClassName="selected"
            className="mr-2 font-normal hover:text-white no-underline">
            Show
          </NavLink>

          <NavLink
            to="/ask"
            activeClassName="selected"
            className="mr-2 font-normal hover:text-white no-underline">
            Ask
          </NavLink>

          <NavLink
            to="/job"
            activeClassName="selected"
            className="mr-2 font-normal hover:text-white no-underline">
            Jobs
          </NavLink>
        </div>

        <a
          href="/about"
          className="hidden md:block mr-3 font-normal text-white no-underline">
          <i className="fab fa-2x fa-react" />
        </a>
        <a
          href="/about"
          className="hidden md:block font-normal text-white no-underline">
          <i className="fab fa-2x fa-github" />
        </a>
      </nav>
    </header>
  )
}

export default Header

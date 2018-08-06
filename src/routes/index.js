import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import asyncComponent from "../components/AsyncComponent"
import Header from "../components/Header"

const createListView = type =>
  asyncComponent(() => import("../containers/CreateListView"), {
    type
  })

const ItemPage = asyncComponent(() => import("../containers/ItemPage"))

const routeList = [
  { path: "/", exact: true, render: () => <Redirect to="/top" /> },
  { path: "/top/:page(\\d+)?", exact: true, component: createListView("top") },
  { path: "/new/:page(\\d+)?", exact: false, component: createListView("new") },
  {
    path: "/show/:page(\\d+)?",
    exact: true,
    component: createListView("show")
  },
  { path: "/ask/:page(\\d+)?", exact: true, component: createListView("ask") },
  { path: "/job/:page(\\d+)?", exact: true, component: createListView("job") },
  { path: "/item/:id(\\d+)", exact: true, component: ItemPage }
]

const routes = (
  <Router>
    <div>
      <Header />

      <Switch>
        {routeList.map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={route.render}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  </Router>
)

export default routes

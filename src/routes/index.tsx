import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { HomepageRoute } from "./homepage"
import { AddRoute } from "./add"
import { AppRoute } from "./app"
import { NotFoundRoute } from "./notfound"
import { ViewRoute } from "./view"

// TODO: fix routing
// whenever we go to /v/:id to /view/:id, it breaks
// Check out: https://reactrouter.com/web/example/nesting

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Homepage */}
        <Route exact path="/">
          <HomepageRoute />
        </Route>

        {/* App */}
        <Route exact path="/app">
          <AppRoute />
        </Route>

        {/* Add (for bookmarklet) */}
        <Route exact path="/add">
          <AddRoute />
        </Route>

        {/* View Routes */}
        <Route path="/view/:id">
          <ViewRoute />
        </Route>

        <Route path="/v/:id">
          <ViewRoute />
        </Route>

        {/* 404 not found */}
        <Route path="*">
          <NotFoundRoute />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

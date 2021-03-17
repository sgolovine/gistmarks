import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { HomepageRoute } from "./homepage"
import { AddRoute } from "./add"
import { ViewRoute } from "./view"
import { AppRoute } from "./app"
import { NotFoundRoute } from "./notfound"

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomepageRoute />
        </Route>
        <Route exact path="/app">
          <AppRoute />
        </Route>
        <Route exact path="/add">
          <AddRoute />
        </Route>
        <Route exact path="/view">
          <ViewRoute />
        </Route>
        <Route path="*">
          <NotFoundRoute />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

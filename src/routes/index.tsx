import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { HomepageRoute } from "./homepage"
import { AddRoute } from "./add"
import { AppRoute } from "./app"
import { NotFoundRoute } from "./notfound"
import { ViewRoute } from "./view"

const PrimarySwitch = () => (
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
    <Route path="*">
      <NotFoundRoute />
    </Route>
  </Switch>
)

const ViewSwitch = () => (
  <Switch>
    <Route path="/view/:id">
      <ViewRoute />
    </Route>
    <Route path="/v/:id">
      <ViewRoute />
    </Route>
  </Switch>
)

export const Router = () => {
  return (
    <BrowserRouter>
      <PrimarySwitch />
      <ViewSwitch />
    </BrowserRouter>
  )
}

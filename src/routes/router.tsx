import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { AddRoute } from "./add"
import { AppRoute } from "./app"
import { ViewRootRoute, ViewGistRoute } from "./view"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AppRoute />
        </Route>
        <Route exact path="/view">
          <ViewRootRoute />
        </Route>
        <Route exact path="/add">
          <AddRoute />
        </Route>
        <Route exact path="/v">
          <ViewRootRoute />
        </Route>
        <Route path="/view/:id">
          <ViewGistRoute />
        </Route>
        <Route path="/v/:id">
          <ViewGistRoute />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

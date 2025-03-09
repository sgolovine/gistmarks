import { Route, Switch } from "wouter"
import { AddRoute } from "./add"
import { AppRoute } from "./app"
import { ViewRootRoute, ViewGistRoute } from "./view"

export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/">
        <AppRoute />
      </Route>
      <Route path="/view">
        <ViewRootRoute />
      </Route>
      <Route path="/add">
        <AddRoute />
      </Route>
      <Route path="/v">
        <ViewRootRoute />
      </Route>
      <Route path="/view/:id">
        <ViewGistRoute />
      </Route>
      <Route path="/v/:id">
        <ViewGistRoute />
      </Route>
    </Switch>
  )
}

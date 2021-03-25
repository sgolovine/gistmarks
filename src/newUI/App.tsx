import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import React from "react"
import { LayoutContextProvider } from "./context/LayoutContext"
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"
import Panel from "./layout/Panel"

export default function App() {
  return (
    <LayoutContextProvider>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Panel />
      <div>
        <h1>App</h1>
      </div>
    </LayoutContextProvider>
  )
}

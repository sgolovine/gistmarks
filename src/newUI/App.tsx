import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import React from "react"
import { CreatePanel, EditPanel } from "./components/BookmarkPanel"
import { LayoutContextProvider } from "./context/LayoutContext"
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"

export default function App() {
  return (
    <LayoutContextProvider>
      <CssBaseline />
      <Header />
      <Sidebar />
      <CreatePanel />
      <EditPanel />
      <div>
        <h1>App</h1>
      </div>
    </LayoutContextProvider>
  )
}
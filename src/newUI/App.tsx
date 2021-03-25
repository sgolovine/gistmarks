import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import React from "react"
import { CreatePanel, EditPanel } from "./components/BookmarkPanel"
import { SettingsPanel } from "./components/SettingsPanel"
import { LayoutContextProvider } from "./context/LayoutContext"
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"

const PanelsAndSidebars = () => (
  <>
    <Sidebar />
    <CreatePanel />
    <EditPanel />
    <SettingsPanel />
  </>
)

export default function App() {
  return (
    <LayoutContextProvider>
      <CssBaseline />
      <Header />
      <PanelsAndSidebars />
      <div>
        <h1>App</h1>
      </div>
    </LayoutContextProvider>
  )
}

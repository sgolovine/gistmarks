import React, { ReactNode, useContext } from "react"
import { LayoutContext } from "../context/LayoutContext"
import { CreatePanel, EditPanel } from "./editor"
import Header from "./Header"
import Sidebar from "./Sidebar"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const layoutContext = useContext(LayoutContext)
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row overflow-hidden max-h-full">
        {layoutContext.sidebarOpen && <Sidebar />}
        <div className="border flex-grow overflow-y-scroll mb-14 h-screen">
          {children}
        </div>
        {layoutContext.createPanelOpen && <CreatePanel />}
        {layoutContext.editPanelOpen && <EditPanel />}
      </div>
    </div>
  )
}

export default Layout

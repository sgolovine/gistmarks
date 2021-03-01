import React, { ReactNode, useContext } from "react"
import { LayoutContext } from "./context/layoutContext"
import CreatePanel from "./CreatePanel"
import Header from "./Header"
import Sidebar from "./Sidebar"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const layoutContext = useContext(LayoutContext)
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-row flex-wrap border">{children}</div>
        {layoutContext.createPanelOpen && <CreatePanel />}
      </div>
    </div>
  )
}

export default Layout

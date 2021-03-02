import React, { useState, createContext, ReactNode } from "react"

interface LayoutContext {
  toggleCreatePanel: () => void
  toggleSidebar: () => void
  createPanelOpen: boolean
  sidebarOpen: boolean
}

interface LayoutContextProvider {
  children: ReactNode
}

export const LayoutContext = createContext<LayoutContext>({
  toggleCreatePanel: () => null,
  toggleSidebar: () => null,
  createPanelOpen: false,
  sidebarOpen: true,
})

const LayoutContextProvider: React.FC<LayoutContextProvider> = ({
  children,
}) => {
  const [createPanelOpen, setCreatePanelOpen] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const toggleCreatePanel = () => setCreatePanelOpen(!createPanelOpen)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const value: LayoutContext = {
    createPanelOpen,
    sidebarOpen,
    toggleCreatePanel,
    toggleSidebar,
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export default LayoutContextProvider

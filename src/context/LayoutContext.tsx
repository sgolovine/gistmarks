import React, { useState, createContext, ReactNode } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"

interface LayoutContext {
  toggleCreatePanel: () => void
  toggleSidebar: () => void
  createPanelOpen: boolean
  sidebarOpen: boolean
}

export const LayoutContext = createContext<LayoutContext>({
  toggleCreatePanel: () => null,
  toggleSidebar: () => null,
  createPanelOpen: false,
  sidebarOpen: true,
})

export const LayoutContextProvider: React.FC<ContextProviderProps> = ({
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
    <LayoutContext.Provider value={value}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ContextDevTool
          context={LayoutContext}
          id="layoutContext"
          displayName="Layout Context"
        />
      )}
    </LayoutContext.Provider>
  )
}

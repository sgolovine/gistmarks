import React, { useState, createContext, ReactNode, useEffect } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"

interface LayoutContext {
  toggleCreatePanel: () => void
  toggleEditPanel: () => void
  toggleSidebar: () => void
  createPanelOpen: boolean
  editPanelOpen: boolean
  sidebarOpen: boolean
}

export const LayoutContext = createContext<LayoutContext>({
  toggleCreatePanel: () => null,
  toggleEditPanel: () => null,
  toggleSidebar: () => null,
  createPanelOpen: false,
  editPanelOpen: false,
  sidebarOpen: true,
})

export const LayoutContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [createPanelOpen, setCreatePanelOpen] = useState<boolean>(false)
  const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const toggleCreatePanel = () => setCreatePanelOpen(!createPanelOpen)
  const toggleEditPanel = () => setEditPanelOpen(!editPanelOpen)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    if (createPanelOpen) {
      setEditPanelOpen(false)
    }
    if (editPanelOpen) {
      setCreatePanelOpen(false)
    }
  }, [editPanelOpen, createPanelOpen])

  const value: LayoutContext = {
    createPanelOpen,
    editPanelOpen,
    sidebarOpen,
    toggleCreatePanel,
    toggleEditPanel,
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

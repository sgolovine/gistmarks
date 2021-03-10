import React, { useState, createContext, ReactNode, useEffect } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"

interface LayoutContext {
  toggleCreatePanel: () => void
  toggleEditPanel: () => void
  toggleSidebar: () => void
  toggleCollectionModal: () => void
  createPanelOpen: boolean
  editPanelOpen: boolean
  sidebarOpen: boolean
  collectionModalOpen: boolean
}

export const LayoutContext = createContext<LayoutContext>({
  toggleCreatePanel: () => null,
  toggleEditPanel: () => null,
  toggleSidebar: () => null,
  toggleCollectionModal: () => null,
  createPanelOpen: false,
  editPanelOpen: false,
  sidebarOpen: true,
  collectionModalOpen: false,
})

export const LayoutContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [createPanelOpen, setCreatePanelOpen] = useState<boolean>(false)
  const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [collectionModalOpen, setCollectionModalOpen] = useState<boolean>(false)

  const toggleCreatePanel = () => setCreatePanelOpen(!createPanelOpen)
  const toggleEditPanel = () => setEditPanelOpen(!editPanelOpen)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleCollectionModal = () =>
    setCollectionModalOpen(!collectionModalOpen)

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
    collectionModalOpen,
    toggleCreatePanel,
    toggleEditPanel,
    toggleSidebar,
    toggleCollectionModal,
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

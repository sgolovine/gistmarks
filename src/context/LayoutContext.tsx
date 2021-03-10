import React, { useState, createContext, ReactNode, useEffect } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"

interface LayoutContextState {
  createPanelOpen: boolean
  editPanelOpen: boolean
  sidebarOpen: boolean
  devModalOpen: boolean
  collectionModalOpen: boolean
}

interface LayoutContextActions {
  toggleCreatePanel: () => void
  toggleEditPanel: () => void
  toggleSidebar: () => void
  toggleDevModal: () => void
  toggleCollectionModal: () => void
}

type LayoutContext = LayoutContextState & LayoutContextActions

export const LayoutContext = createContext<LayoutContext>({} as LayoutContext)

export const LayoutContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [layoutState, setLayoutState] = useState<LayoutContextState>({
    createPanelOpen: false,
    editPanelOpen: false,
    sidebarOpen: true,
    devModalOpen: false,
    collectionModalOpen: false,
  })

  const toggle = (field: keyof LayoutContextState, newValue: boolean) => {
    setLayoutState({
      ...layoutState,
      [field]: newValue,
    })
  }

  // If we open the edit window, close the create window
  useEffect(() => {
    if (layoutState.createPanelOpen) {
      toggle("editPanelOpen", false)
      return
    }
    if (layoutState.editPanelOpen) {
      toggle("createPanelOpen", false)
      return
    }
  }, [layoutState.editPanelOpen, layoutState.createPanelOpen])

  const states: LayoutContextState = {
    createPanelOpen: layoutState.createPanelOpen,
    editPanelOpen: layoutState.editPanelOpen,
    sidebarOpen: layoutState.sidebarOpen,
    devModalOpen: layoutState.devModalOpen,
    collectionModalOpen: layoutState.collectionModalOpen,
  }

  const actions: LayoutContextActions = {
    toggleCreatePanel: () =>
      toggle("createPanelOpen", !layoutState.createPanelOpen),
    toggleEditPanel: () => toggle("editPanelOpen", !layoutState.editPanelOpen),
    toggleSidebar: () => toggle("sidebarOpen", !layoutState.sidebarOpen),
    toggleDevModal: () => toggle("devModalOpen", !layoutState.devModalOpen),
    toggleCollectionModal: () =>
      toggle("collectionModalOpen", !layoutState.collectionModalOpen),
  }

  return (
    <LayoutContext.Provider value={{ ...states, ...actions }}>
      {children}
      {dev && (
        <ContextDevTool
          context={LayoutContext}
          id="layoutContext"
          displayName="Layout Context"
        />
      )}
    </LayoutContext.Provider>
  )
}

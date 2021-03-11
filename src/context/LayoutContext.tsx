import React, { useState, createContext, ReactNode, useEffect } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"

interface LayoutContextState {
  createPanelOpen: boolean
  editPanelOpen: boolean
  sidebarOpen: boolean
  devModalOpen: boolean
  collectionsPanelOpen: boolean
}

interface LayoutContextActions {
  toggleCreatePanel: () => void
  toggleEditPanel: () => void
  toggleSidebar: () => void
  toggleDevModal: () => void
  toggleCollectionsPanel: () => void
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
    collectionsPanelOpen: false,
  })

  const toggle = (field: keyof LayoutContextState, newValue: boolean) => {
    setLayoutState({
      ...layoutState,
      [field]: newValue,
    })
  }

  useEffect(() => {
    if (layoutState.editPanelOpen) {
      toggle("collectionsPanelOpen", false)
      toggle("createPanelOpen", false)
    }
  }, [layoutState.editPanelOpen])

  useEffect(() => {
    if (layoutState.createPanelOpen) {
      toggle("editPanelOpen", false)
      toggle("collectionsPanelOpen", false)
    }
  }, [layoutState.createPanelOpen])

  useEffect(() => {
    if (layoutState.collectionsPanelOpen) {
      toggle("editPanelOpen", false)
      toggle("createPanelOpen", false)
    }
  }, [layoutState.collectionsPanelOpen])

  const states: LayoutContextState = {
    createPanelOpen: layoutState.createPanelOpen,
    editPanelOpen: layoutState.editPanelOpen,
    sidebarOpen: layoutState.sidebarOpen,
    devModalOpen: layoutState.devModalOpen,
    collectionsPanelOpen: layoutState.collectionsPanelOpen,
  }

  const actions: LayoutContextActions = {
    toggleCreatePanel: () =>
      toggle("createPanelOpen", !layoutState.createPanelOpen),
    toggleEditPanel: () => toggle("editPanelOpen", !layoutState.editPanelOpen),
    toggleSidebar: () => toggle("sidebarOpen", !layoutState.sidebarOpen),
    toggleDevModal: () => toggle("devModalOpen", !layoutState.devModalOpen),
    toggleCollectionsPanel: () =>
      toggle("collectionsPanelOpen", !layoutState.collectionsPanelOpen),
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

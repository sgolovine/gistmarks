import React, { useState, createContext, ReactNode, useEffect } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"

interface LayoutContextState {
  createPanelOpen: boolean
  editPanelOpen: boolean
  sidebarOpen: boolean
  devModalOpen: boolean
  collectionPanel: {
    open: boolean
    editMode: boolean
  }
}

interface LayoutContextActions {
  toggleCreatePanel: () => void
  toggleEditPanel: () => void
  toggleSidebar: () => void
  toggleDevModal: () => void
  toggleCollectionsPanel: ({
    open,
    editMode,
  }: {
    open: boolean
    editMode?: boolean
  }) => void
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
    collectionPanel: {
      open: false,
      editMode: false,
    },
  })

  const toggle = (field: keyof LayoutContextState, newValue: boolean) => {
    setLayoutState({
      ...layoutState,
      [field]: newValue,
    })
  }

  const toggleCollectionsPanel = ({
    open,
    editMode = false,
  }: {
    open: boolean
    editMode?: boolean
  }) => {
    setLayoutState({
      ...layoutState,
      collectionPanel: {
        open,
        editMode,
      },
    })
  }

  useEffect(() => {
    if (layoutState.editPanelOpen) {
      toggleCollectionsPanel({ open: false })
      toggle("createPanelOpen", false)
    }
  }, [layoutState.editPanelOpen])

  useEffect(() => {
    if (layoutState.createPanelOpen) {
      toggle("editPanelOpen", false)
      toggleCollectionsPanel({ open: false })
    }
  }, [layoutState.createPanelOpen])

  useEffect(() => {
    if (layoutState.collectionPanel.open) {
      toggle("editPanelOpen", false)
      toggle("createPanelOpen", false)
    }
  }, [layoutState.collectionPanel.open])

  const states: LayoutContextState = {
    createPanelOpen: layoutState.createPanelOpen,
    editPanelOpen: layoutState.editPanelOpen,
    sidebarOpen: layoutState.sidebarOpen,
    devModalOpen: layoutState.devModalOpen,
    collectionPanel: layoutState.collectionPanel,
  }

  const actions: LayoutContextActions = {
    toggleCreatePanel: () =>
      toggle("createPanelOpen", !layoutState.createPanelOpen),
    toggleEditPanel: () => toggle("editPanelOpen", !layoutState.editPanelOpen),
    toggleSidebar: () => toggle("sidebarOpen", !layoutState.sidebarOpen),
    toggleDevModal: () => toggle("devModalOpen", !layoutState.devModalOpen),
    toggleCollectionsPanel,
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

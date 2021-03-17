import React, { useState, createContext, useEffect } from "react"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"

interface LayoutContextState {
  createPanelOpen: boolean
  editPanelOpen: boolean
  sidebarOpen: boolean
  savePanelOpen: boolean
}

interface LayoutContextActions {
  toggleCreatePanel: () => void
  toggleEditPanel: () => void
  toggleSidebar: () => void
  toggleSavePanel: () => void
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
    savePanelOpen: false,
  })

  const toggle = (field: keyof LayoutContextState, newValue: boolean) => {
    setLayoutState({
      ...layoutState,
      [field]: newValue,
    })
  }

  useEffect(() => {
    if (layoutState.editPanelOpen) {
      toggle("createPanelOpen", false)
    }
  }, [layoutState.editPanelOpen])

  useEffect(() => {
    if (layoutState.createPanelOpen) {
      toggle("editPanelOpen", false)
    }
  }, [layoutState.createPanelOpen])

  const states: LayoutContextState = {
    createPanelOpen: layoutState.createPanelOpen,
    editPanelOpen: layoutState.editPanelOpen,
    sidebarOpen: layoutState.sidebarOpen,
    savePanelOpen: layoutState.savePanelOpen,
  }

  const actions: LayoutContextActions = {
    toggleCreatePanel: () =>
      toggle("createPanelOpen", !layoutState.createPanelOpen),
    toggleEditPanel: () => toggle("editPanelOpen", !layoutState.editPanelOpen),
    toggleSidebar: () => toggle("sidebarOpen", !layoutState.sidebarOpen),
    toggleSavePanel: () => toggle("savePanelOpen", !layoutState.savePanelOpen),
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

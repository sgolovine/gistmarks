import React, { createContext, useReducer } from "react"
import { ContextProviderProps } from "~/model/Context"
import { initialState, reducer } from "./reducer"
import { ILayoutContext } from "./types"

export const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext)

export const LayoutContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: ILayoutContext = {
    sidebarOpen: state.sidebarOpen,
    createPanelOpen: state.createPanelOpen,
    editPanelOpen: state.editPanelOpen,
    syncPanelOpen: state.syncPanelOpen,

    // Actions
    openSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR", payload: true }),
    closeSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR", payload: true }),
    openCreatePanel: () => dispatch({ type: "TOGGLE_CREATE", payload: true }),
    closeCreatePanel: () => dispatch({ type: "TOGGLE_CREATE", payload: false }),
    openEditPanel: () => dispatch({ type: "TOGGLE_EDIT", payload: true }),
    closeEditPanel: () => dispatch({ type: "TOGGLE_EDIT", payload: false }),
    openSyncPanel: () => dispatch({ type: "TOGGLE_SYNC", payload: true }),
    closeSyncPanel: () => dispatch({ type: "TOGGLE_SYNC", payload: false }),
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

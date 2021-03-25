import React, { useState, createContext } from "react"
import { ContextProviderProps } from "~/model/Context"

interface ILayoutContext {
  sidebarOpen: boolean
  panelOpen: boolean
  setSidebarState: (newState: boolean) => void
  setPanelState: (newState: boolean) => void
}

export const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext)

export const LayoutContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [panelOpen, setPanelOpen] = useState<boolean>(false)

  const setSidebarState = (newState: boolean) => setSidebarOpen(newState)
  const setPanelState = (newState: boolean) => setPanelOpen(newState)

  const value: ILayoutContext = {
    sidebarOpen,
    panelOpen,
    setSidebarState,
    setPanelState,
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

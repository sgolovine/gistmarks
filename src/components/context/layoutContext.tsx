import React, { useState, createContext, ReactNode } from "react"

interface LayoutContext {
  toggleCreatePanel: () => void
  createPanelOpen: boolean
}

interface LayoutContextProvider {
  children: ReactNode
}

export const LayoutContext = createContext<LayoutContext>({
  toggleCreatePanel: () => null,
  createPanelOpen: false,
})

const LayoutContextProvider: React.FC<LayoutContextProvider> = ({
  children,
}) => {
  const [createPanelOpen, setCreatePanelOpen] = useState<boolean>(false)

  const toggleCreatePanel = () => setCreatePanelOpen(!createPanelOpen)

  const value = { createPanelOpen, toggleCreatePanel }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export default LayoutContextProvider

// Add any values here that would need to be used globally but
// do not require their own module

import React, { createContext, useState } from "react"
import { ContextProviderProps } from "~/model/Context"

interface GlobalStateContext {
  unsavedChanges: boolean
  setUnsavedChanges: (newState: boolean) => void
}

export const GlobalStateContext = createContext<GlobalStateContext>({
  unsavedChanges: false,
  setUnsavedChanges: () => null,
})

export const GlobalStateContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false)

  const value: GlobalStateContext = {
    unsavedChanges,
    setUnsavedChanges,
  }

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )
}

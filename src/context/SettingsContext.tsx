import React, { createContext, useState } from "react"
import { ContextProviderProps } from "~/model/Context"

interface SettingsState {
  showSortedList: boolean
}

type SettingsContext = SettingsState & {
  setField: (field: keyof SettingsState, value: boolean) => void
}

const initialState: SettingsState = {
  showSortedList: true,
}

const SettingsContext = createContext<SettingsContext>({
  ...initialState,
  setField: () => null,
})

export const SettingsContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<SettingsState>(initialState)

  const setField = (field: keyof SettingsState, value: boolean) => {
    setState({
      ...state,
      [field]: value,
    })
  }

  const providerValue = {
    ...state,
    setField,
  }

  return (
    <SettingsContext.Provider value={providerValue}>
      {children}
    </SettingsContext.Provider>
  )
}

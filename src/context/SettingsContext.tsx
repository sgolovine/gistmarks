import React, { createContext } from "react"
import { VIEW_SETTINGS_STORAGE_KEY } from "~/defines"
import useLocalStorage from "~/hooks/useLocalStorage"
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

export const SettingsContext = createContext<SettingsContext>({
  ...initialState,
  setField: () => null,
})

export const SettingsContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useLocalStorage<SettingsState>(
    VIEW_SETTINGS_STORAGE_KEY,
    initialState
  )

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

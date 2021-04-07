import React, { createContext } from "react"
import { SETTINGS_STORAGE_KEY } from "~/defines"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { AppAction, ContextProviderProps } from "~/model/Context"

type SettingsState = {
  unsavedChanges: boolean
  showSortedList: boolean
}

const initialState: SettingsState = {
  unsavedChanges: false,
  showSortedList: true,
}

type ActionTypes = "SET_SHOW_SORTED_LIST" | "SET_UNSAVED_CHANGES"

type SettingsContext = {
  state: SettingsState
  actions: {
    setUnsavedChanges: (newValue: boolean) => void
    setSortedList: (newValue: boolean) => void
  }
}

function reducer(
  state: SettingsState,
  action: AppAction<ActionTypes>
): SettingsState {
  switch (action.type) {
    case "SET_SHOW_SORTED_LIST":
      return {
        ...state,
        showSortedList: action.payload,
      }
    case "SET_UNSAVED_CHANGES":
      return {
        ...state,
        unsavedChanges: action.payload,
      }
    default:
      return state
  }
}

export const SettingsContext = createContext<SettingsContext>(
  {} as SettingsContext
)

export const SettingsContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    SETTINGS_STORAGE_KEY
  )

  const value: SettingsContext = {
    state,
    actions: {
      setUnsavedChanges: (payload: boolean) =>
        dispatch({ type: "SET_UNSAVED_CHANGES", payload }),
      setSortedList: (payload: boolean) =>
        dispatch({ type: "SET_SHOW_SORTED_LIST", payload }),
    },
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

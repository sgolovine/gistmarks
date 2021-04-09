import React, { createContext, useEffect } from "react"
import { SETTINGS_STORAGE_KEY } from "~/defines"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { AppAction, ContextProviderProps } from "~/model/Context"
import { getHealth } from "~/requests/health"

type SettingsState = {
  // Dictates if we should open a link in a new tab
  openInNewTab: boolean
  // Checks if we have unsaved changes
  unsavedChanges: boolean
  // Dictates if we show a sorted list or not
  showSortedList: boolean
  isDark: boolean

  // Check if backend is connected
  isBackendConnected: boolean
}

const initialState: SettingsState = {
  openInNewTab: true,
  unsavedChanges: false,
  showSortedList: true,
  isDark: false,
  isBackendConnected: false,
}

type ActionTypes =
  | "SET_OPEN_NEW_TAB"
  | "SET_SHOW_SORTED_LIST"
  | "SET_UNSAVED_CHANGES"
  | "SET_THEME"
  | "SET_BACKEND_CONNECTED"

type SettingsContext = {
  state: SettingsState
  actions: {
    setOpenNewTab: (newValue: boolean) => void
    setUnsavedChanges: (newValue: boolean) => void
    setSortedList: (newValue: boolean) => void
    setIsDark: (darkTheme: boolean) => void
  }
}

function reducer(
  state: SettingsState,
  action: AppAction<ActionTypes>
): SettingsState {
  switch (action.type) {
    case "SET_OPEN_NEW_TAB":
      return {
        ...state,
        openInNewTab: action.payload,
      }
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
    case "SET_THEME":
      return {
        ...state,
        isDark: action.payload,
      }
    case "SET_BACKEND_CONNECTED":
      return {
        ...state,
        isBackendConnected: action.payload,
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

  // Health check. Mostly for development purposes. Prevents calls being made
  // to backend when it's down.
  useEffect(() => {
    getHealth()
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({ type: "SET_BACKEND_CONNECTED", payload: true })
        } else {
          dispatch({ type: "SET_BACKEND_CONNECTED", payload: false })
        }
      })
      .catch(() => dispatch({ type: "SET_BACKEND_CONNECTED", payload: false }))
  }, [])

  const value: SettingsContext = {
    state,
    actions: {
      setOpenNewTab: (payload: boolean) =>
        dispatch({ type: "SET_OPEN_NEW_TAB", payload }),
      setUnsavedChanges: (payload: boolean) =>
        dispatch({ type: "SET_UNSAVED_CHANGES", payload }),
      setSortedList: (payload: boolean) =>
        dispatch({ type: "SET_SHOW_SORTED_LIST", payload }),
      setIsDark: (payload: boolean) => dispatch({ type: "SET_THEME", payload }),
    },
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

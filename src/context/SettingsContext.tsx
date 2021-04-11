import React, { createContext } from "react"
import { SETTINGS_STORAGE_KEY } from "~/defines"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { AppAction, ContextProviderProps } from "~/model/Context"

type SettingsState = {
  // Dictates if we should open a link in a new tab
  openInNewTab: boolean
  // Checks if we have unsaved changes
  unsavedChanges: boolean
  // Dictates if we show a sorted list or not
  showSortedList: boolean
  // Show the dark theme
  isDark: boolean
  // First run - used for showing intro modal
  firstRun: boolean
}

const initialState: SettingsState = {
  openInNewTab: true,
  unsavedChanges: false,
  showSortedList: true,
  isDark: false,
  firstRun: true,
}

type ActionTypes =
  | "SET_OPEN_NEW_TAB"
  | "SET_SHOW_SORTED_LIST"
  | "SET_UNSAVED_CHANGES"
  | "SET_THEME"
  | "SET_FIRST_RUN"

type SettingsContext = {
  state: SettingsState
  actions: {
    setOpenNewTab: (newValue: boolean) => void
    setUnsavedChanges: (newValue: boolean) => void
    setSortedList: (newValue: boolean) => void
    setIsDark: (darkTheme: boolean) => void
    setFirstRun: () => void
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
    case "SET_FIRST_RUN":
      return {
        ...state,
        firstRun: false,
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
      setOpenNewTab: (payload: boolean) =>
        dispatch({ type: "SET_OPEN_NEW_TAB", payload }),
      setUnsavedChanges: (payload: boolean) =>
        dispatch({ type: "SET_UNSAVED_CHANGES", payload }),
      setSortedList: (payload: boolean) =>
        dispatch({ type: "SET_SHOW_SORTED_LIST", payload }),
      setIsDark: (payload: boolean) => dispatch({ type: "SET_THEME", payload }),
      setFirstRun: () => dispatch({ type: "SET_FIRST_RUN" }),
    },
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

import React, { createContext, ReactNode } from "react"
import { SETTINGS_STORAGE_KEY } from "~/defines"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { initialState, reducer } from "./reducer"
import { ISettingsContext } from "./types"

export const SettingsContext = createContext<ISettingsContext>(
  {} as ISettingsContext
)

export const SettingsContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    SETTINGS_STORAGE_KEY
  )

  const value: ISettingsContext = {
    ...state,
    setOpenNewTab: (payload: boolean) =>
      dispatch({ type: "SET_OPEN_NEW_TAB", payload }),
    setUnsavedChanges: (payload: boolean) =>
      dispatch({ type: "SET_UNSAVED_CHANGES", payload }),
    setSortedList: (payload: boolean) =>
      dispatch({ type: "SET_SHOW_SORTED_LIST", payload }),
    setIsDark: (payload: boolean) => dispatch({ type: "SET_THEME", payload }),
    setFirstRun: () => dispatch({ type: "SET_FIRST_RUN" }),
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

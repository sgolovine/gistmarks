import { AppAction } from "~/model/Context"
import { ActionTypes, SettingsState } from "./types"

export const initialState: SettingsState = {
  openInNewTab: false,
  unsavedChanges: false,
  showSortedList: true,
  isDark: false,
  firstRun: true,
}
export function reducer(
  state: SettingsState = initialState,
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

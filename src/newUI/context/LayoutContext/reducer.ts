import { ActionTypes, LayoutState } from "./types"

export const initialState: LayoutState = {
  createPanelOpen: false,
  editPanelOpen: false,
  sidebarOpen: false,
  settingsPanelOpen: false,
}

export function reducer(
  state: LayoutState,
  action: { type: ActionTypes; payload: boolean }
): LayoutState {
  switch (action.type) {
    case "TOGGLE_CREATE":
      return {
        ...state,
        createPanelOpen: action.payload,
        editPanelOpen: false,
        settingsPanelOpen: false,
      }
    case "TOGGLE_EDIT":
      return {
        ...state,
        editPanelOpen: action.payload,
        createPanelOpen: false,
        settingsPanelOpen: false,
      }
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.payload,
      }
    case "TOGGLE_SETTINGS": {
      return {
        ...state,
        settingsPanelOpen: action.payload,
        createPanelOpen: false,
        editPanelOpen: false,
      }
    }
    default:
      return state
  }
}

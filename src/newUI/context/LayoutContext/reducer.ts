import { ActionTypes, LayoutState } from "./types"

export const initialState: LayoutState = {
  createPanelOpen: false,
  editPanelOpen: false,
  sidebarOpen: false,
  syncPanelOpen: false,
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
        syncPanelOpen: false,
      }
    case "TOGGLE_EDIT":
      return {
        ...state,
        editPanelOpen: action.payload,
        createPanelOpen: false,
        syncPanelOpen: false,
      }
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.payload,
      }
    case "TOGGLE_SYNC": {
      return {
        ...state,
        syncPanelOpen: action.payload,
        createPanelOpen: false,
        editPanelOpen: false,
      }
    }
    default:
      return state
  }
}

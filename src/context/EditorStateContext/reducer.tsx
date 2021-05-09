import { AppAction } from "~/model/Context"
import { EditorState, ActionTypes } from "./types"

export const initialState: EditorState = {
  guid: "",
  name: "",
  href: "",
  description: "",
  category: "",
}

export function reducer(
  state: EditorState = initialState,
  action: AppAction<ActionTypes>
): EditorState {
  switch (action.type) {
    case "SET_ALL_FIELDS":
      return {
        ...state,
        guid: action.payload.guid,
        name: action.payload.name,
        href: action.payload.href,
        description: action.payload.description,
        category: action.payload.category,
      }
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      }
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      }
    case "SET_GUID":
      return {
        ...state,
        guid: action.payload,
      }
    case "SET_HREF":
      return {
        ...state,
        href: action.payload,
      }
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      }
    case "RESET":
      return initialState
    default:
      return state
  }
}

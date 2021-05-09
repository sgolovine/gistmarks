import { removeItem, uniq } from "~/helpers"
import { AppAction } from "~/model/Context"
import { ViewState, ActionTypes } from "./types"

export const initialState: ViewState = {
  allBookmarks: {},
  bookmarks: {},
  categories: [],
  activeCategories: [],
  searchTerm: "",
  errorTitle: "",
  errorMessage: "",
  showError: false,
  gistId: null,
  gistLoading: false,
  collectionName: "",
}

export function reducer(
  state: ViewState = initialState,
  action: AppAction<ActionTypes>
): ViewState {
  switch (action.type) {
    case "SET_ALL_BOOKMARKS": {
      return {
        ...state,
        allBookmarks: action.payload,
      }
    }
    case "SET_BOOKMARKS": {
      return {
        ...state,
        bookmarks: action.payload,
      }
    }
    case "SET_CATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      }
    }
    case "ADD_ACTIVE_CATEGORY": {
      const newActiveCategories = uniq([
        ...state.activeCategories,
        action.payload,
      ])

      return {
        ...state,
        activeCategories: newActiveCategories,
      }
    }
    case "REMOVE_ACTIVE_CATEGORY": {
      const newActiveCategories = removeItem(
        state.activeCategories,
        action.payload
      )

      return {
        ...state,
        activeCategories: newActiveCategories,
      }
    }
    case "SET_SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
      }
    }
    case "SHOW_ERROR": {
      return {
        ...state,
        showError: action.payload,
      }
    }
    case "SET_ERROR": {
      return {
        ...state,
        showError: action.payload.showError,
        errorTitle: action.payload.errorTitle,
        errorMessage: action.payload.errorMessage,
      }
    }
    case "SET_ERROR_TITLE": {
      return {
        ...state,
        errorTitle: action.payload,
      }
    }
    case "SET_ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: action.payload,
      }
    }
    case "SET_GIST_ID": {
      return {
        ...state,
        gistId: action.payload,
      }
    }
    case "SET_GIST_LOADING": {
      return {
        ...state,
        gistLoading: action.payload,
      }
    }
    case "SET_COLLECTION_NAME": {
      return {
        ...state,
        collectionName: action.payload,
      }
    }
    default:
      return state
  }
}

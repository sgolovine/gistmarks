import { omitKey, removeItem, uniq } from "~/helpers"
import { AppAction } from "~/model/Context"
import { BookmarkState, ActionTypes } from "./types"

export const initialState: BookmarkState = {
  allBookmarks: {},
  bookmarks: {},
  categories: [],
  activeCategories: [],
  searchTerm: "",
}

export function reducer(
  state: BookmarkState = initialState,
  action: AppAction<ActionTypes>
): BookmarkState {
  switch (action.type) {
    case "SET_ALL_BOOKMARKS":
      return {
        ...state,
        allBookmarks: action.payload,
      }
    case "ADD_BOOKMARK":
      return {
        ...state,
        allBookmarks: {
          ...state.allBookmarks,
          [action.payload.guid]: action.payload,
        },
      }
    case "REMOVE_BOOKMARK": {
      const newBookmarkState = omitKey(action.payload, state.allBookmarks)
      return {
        ...state,
        allBookmarks: newBookmarkState,
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
    case "SET_BOOKMARKS":
      return {
        ...state,
        bookmarks: action.payload,
      }
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      }
    case "SET_SEARCH":
      return {
        ...state,
        searchTerm: action.payload,
      }
    default:
      return state
  }
}

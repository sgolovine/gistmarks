import { IBookmarkContext } from "../BookmarkContext/types"

export type ViewContextType = Pick<
  IBookmarkContext,
  | "allBookmarks"
  | "bookmarks"
  | "categories"
  | "activeCategories"
  | "searchTerm"
  | "addActiveCategory"
  | "removeActiveCategory"
  | "setSearch"
> & {
  collectionName: string
  gistId: string | null
  gistLoading: boolean
  showError: boolean
  errorTitle: string
  errorMessage: string
  setGistId: (gistId: string) => void
}

export type ViewState = Pick<
  ViewContextType,
  | "allBookmarks"
  | "bookmarks"
  | "categories"
  | "activeCategories"
  | "searchTerm"
  | "errorTitle"
  | "errorMessage"
  | "showError"
  | "gistId"
  | "gistLoading"
  | "collectionName"
>

export type ActionTypes =
  | "SET_ALL_BOOKMARKS"
  | "SET_BOOKMARKS"
  | "SET_CATEGORIES"
  | "ADD_ACTIVE_CATEGORY"
  | "REMOVE_ACTIVE_CATEGORY"
  | "SET_SEARCH_TERM"
  | "SET_ERROR_TITLE"
  | "SET_ERROR_MESSAGE"
  | "SHOW_ERROR"
  | "SET_GIST_ID"
  | "SET_GIST_LOADING"
  | "SET_COLLECTION_NAME"
  | "SET_ERROR"

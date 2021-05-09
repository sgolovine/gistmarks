import { IBookmarkContext } from "../BookmarkContext/types"

export type ViewContext = Pick<
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
  gistId: string | null
  gistLoading: boolean
  showError: boolean
  errorTitle: string
  errorMessage: string
  setGistId: (gistId: string) => void
  setError: ({
    show,
    title,
    msg,
  }: {
    show: boolean
    title: string
    msg: string
  }) => void
}

export type ViewState = Pick<
  ViewContext,
  | "allBookmarks"
  | "bookmarks"
  | "categories"
  | "activeCategories"
  | "searchTerm"
  | "errorTitle"
  | "errorMessage"
  | "showError"
  | "gistId"
>

export type ActionTypes =
  | "SET_ALL_BOOKMARKS"
  | "SET_BOOKMARKS"
  | "SET_CATEGORIES"
  | "SET_ACTIVE_CATEGORIES"
  | "SET_SEARCH_TERM"
  | "SET_ERROR_TITLE"
  | "SET_ERROR_MESSAGE"
  | "SHOW_ERROR"
  | "SET_GIST_ID"

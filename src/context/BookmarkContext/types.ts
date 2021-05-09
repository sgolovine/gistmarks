import { BookmarkCollection, Bookmark } from "~/model/Bookmark"

export interface IBookmarkContext {
  allBookmarks: BookmarkCollection
  bookmarks: BookmarkCollection
  categories: string[]
  activeCategories: string[]
  searchTerm: string
  addActiveCategory: (category: string) => void
  removeActiveCategory: (category: string) => void
  addBookmark: (bookmark: Bookmark, guid: string) => void
  removeBookmark: (guid: string) => void
  editBookmark: (bookmark: Partial<Bookmark>, guid: string) => void
  setSearch: (newTerm: string) => void
  restoreBookmarks: (data: string) => void
}

export type BookmarkState = Pick<
  IBookmarkContext,
  | "allBookmarks"
  | "bookmarks"
  | "categories"
  | "activeCategories"
  | "searchTerm"
>

export type ActionTypes =
  | "SET_ALL_BOOKMARKS"
  | "SET_BOOKMARKS"
  | "SET_CATEGORIES"
  | "SET_ACTIVE_CATEGORIES"
  | "SET_SEARCH"
  | "ADD_BOOKMARK"
  | "REMOVE_BOOKMARK"
  | "ADD_ACTIVE_CATEGORY"
  | "REMOVE_ACTIVE_CATEGORY"

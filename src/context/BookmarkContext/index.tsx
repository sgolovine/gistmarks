import React, { createContext, useContext, useEffect } from "react"
import { BOOKMARK_STORAGE_KEY } from "~/defines"
import {
  extractCategories,
  filterBySearchTerm,
  filterByCategories,
} from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import { SettingsContext } from "~/context"
import { IBookmarkContext } from "./types"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { reducer, initialState } from "./reducer"

export const BookmarkContext = createContext<IBookmarkContext>(
  {} as IBookmarkContext
)

export const BookmarkContextProvider: React.FC = ({ children }) => {
  const settingsContext = useContext(SettingsContext)

  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    BOOKMARK_STORAGE_KEY
  )

  useEffect(() => {
    const extractedCategories = extractCategories(state.allBookmarks)
    dispatch({
      type: "SET_CATEGORIES",
      payload: extractedCategories,
    })
  }, [state.allBookmarks])

  useEffect(() => {
    if (state.searchTerm) {
      const filteredBookmarks = filterBySearchTerm(
        state.allBookmarks,
        state.searchTerm
      )
      dispatch({
        type: "SET_BOOKMARKS",
        payload: filteredBookmarks,
      })
    } else if (state.activeCategories.length > 0) {
      const filteredBookmarks = filterByCategories(
        state.allBookmarks,
        state.activeCategories
      )
      dispatch({
        type: "SET_BOOKMARKS",
        payload: filteredBookmarks,
      })
    } else {
      dispatch({
        type: "SET_BOOKMARKS",
        payload: state.allBookmarks,
      })
    }
  }, [
    state.allBookmarks,
    state.categories,
    state.activeCategories,
    state.searchTerm,
  ])

  const addBookmark = (bookmark: Bookmark) => {
    dispatch({
      type: "ADD_BOOKMARK",
      payload: bookmark,
    })
    settingsContext.setUnsavedChanges(true)
  }

  const removeBookmark = (guid: string) => {
    dispatch({
      type: "REMOVE_BOOKMARK",
      payload: guid,
    })
    settingsContext.setUnsavedChanges(true)
  }

  const editBookmark = (bookmark: Partial<Bookmark>, guid: string) => {
    if (state.allBookmarks[guid]) {
      const completeBookmark = {
        ...state.allBookmarks[guid],
        ...bookmark,
      }
      dispatch({ type: "ADD_BOOKMARK", payload: completeBookmark })
      settingsContext.setUnsavedChanges(true)
    }
  }

  const addActiveCategory = (category: string) => {
    dispatch({
      type: "ADD_ACTIVE_CATEGORY",
      payload: category,
    })
  }

  const removeActiveCategory = (category: string) => {
    dispatch({
      type: "REMOVE_ACTIVE_CATEGORY",
      payload: category,
    })
  }

  const setSearch = (newSearchTerm: string) => {
    dispatch({ type: "SET_SEARCH", payload: newSearchTerm })
  }

  const restoreBookmarks = (backup: string) => {
    try {
      const parsedData = JSON.parse(backup)
      dispatch({
        type: "SET_ALL_BOOKMARKS",
        payload: parsedData,
      })
    } catch {
      alert("Unable to restore backup")
    }
  }

  const value: IBookmarkContext = {
    ...state,
    addBookmark,
    editBookmark,
    removeBookmark,
    addActiveCategory,
    removeActiveCategory,
    setSearch,
    restoreBookmarks,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}

import React, { createContext, useContext, useEffect, useState } from "react"
import { BOOKMARK_STORAGE_KEY } from "~/defines"
import {
  omitKey,
  removeItem,
  uniq,
  extractCategories,
  filterBySearchTerm,
  filterByCategories,
} from "~/helpers"
import useLocalStorage from "~/hooks/useLocalStorage"
import { Bookmark, BookmarkCollection } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"
import { SettingsContext } from "../SettingsContext"

interface BookmarkContext {
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

export const BookmarkContext = createContext<BookmarkContext>({
  allBookmarks: {},
  bookmarks: {},
  categories: [],
  activeCategories: [],
  searchTerm: "",
  addActiveCategory: () => null,
  removeActiveCategory: () => null,
  addBookmark: () => null,
  removeBookmark: () => null,
  editBookmark: () => null,
  setSearch: () => null,
  restoreBookmarks: () => null,
})

export const BookmarkContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const settingsContext = useContext(SettingsContext)

  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkCollection>(
    BOOKMARK_STORAGE_KEY,
    {}
  )
  const [
    filteredBookmarks,
    setFilteredBookmarks,
  ] = useState<BookmarkCollection>(bookmarks)

  const [categories, setCategories] = useState<string[]>([])

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [activeCategories, setActiveCategories] = useState<string[]>([])

  useEffect(() => {
    setCategories(extractCategories(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    if (searchTerm) {
      const filteredBookmarks = filterBySearchTerm(bookmarks, searchTerm)
      setFilteredBookmarks(filteredBookmarks)
    } else if (activeCategories.length > 0) {
      const filterBookmarks = filterByCategories(bookmarks, activeCategories)
      setFilteredBookmarks(filterBookmarks)
    } else {
      setFilteredBookmarks(bookmarks)
    }
  }, [bookmarks, categories, activeCategories, searchTerm])

  const addBookmark = (bookmark: Bookmark, guid: string) => {
    setBookmarks({
      ...bookmarks,
      [guid]: bookmark,
    })
    settingsContext.actions.setUnsavedChanges(true)
  }
  const removeBookmark = (guid: string) => {
    const newState = omitKey(guid, bookmarks)
    setBookmarks(newState)
    settingsContext.actions.setUnsavedChanges(true)
  }

  const editBookmark = (bookmark: Partial<Bookmark>, guid: string) => {
    if (bookmarks[guid]) {
      setBookmarks({
        ...bookmarks,
        [guid]: {
          ...bookmarks[guid],
          ...bookmark,
        },
      })
      settingsContext.actions.setUnsavedChanges(true)
    }
  }

  const addActiveCategory = (category: string) => {
    setActiveCategories(uniq([...activeCategories, category]))
  }

  const removeActiveCategory = (category: string) => {
    setActiveCategories(removeItem(activeCategories, category))
  }

  const setSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  const restoreBookmarks = (backup: string) => {
    try {
      const parsedData = JSON.parse(backup)
      setBookmarks(parsedData)
    } catch {
      alert("Unable to restore backup")
    }
  }

  const value: BookmarkContext = {
    allBookmarks: bookmarks,
    bookmarks: filteredBookmarks,
    activeCategories,
    categories,
    searchTerm,
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
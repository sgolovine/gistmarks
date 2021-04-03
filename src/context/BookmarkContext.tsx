import React, { createContext, useContext, useEffect, useState } from "react"
import { BOOKMARK_STORAGE_KEY } from "~/defines"
import { omitKey, removeItem, uniq } from "~/helpers"
import { extractCategories } from "~/helpers/extractCategories"
import { filterBySearchTerm, filterByCategories } from "~/helpers/filtering"
import useLocalStorage from "~/hooks/useLocalStorage"
import { Bookmark, BookmarkCollection } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"
import { GlobalStateContext } from "./GlobalStateContext"

interface BookmarkContext {
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
  const globalStateContext = useContext(GlobalStateContext)

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
    globalStateContext.setUnsavedChanges(true)
  }
  const removeBookmark = (guid: string) => {
    const newState = omitKey(guid, bookmarks)
    setBookmarks(newState)
    globalStateContext.setUnsavedChanges(true)
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
      globalStateContext.setUnsavedChanges(true)
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

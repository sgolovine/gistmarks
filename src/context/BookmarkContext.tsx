import React, { createContext, useEffect, useState } from "react"
import { BOOKMARK_STORAGE_KEY } from "~/defines"
import { omitKey, removeItem, uniq } from "~/helpers"
import useLocalStorage from "~/hooks/useLocalStorage"
import { Bookmark } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"

type Bookmarks = {
  [guid: string]: Bookmark
}

interface BookmarkContext {
  bookmarks: Bookmarks
  categories: string[]
  activeCategories: string[]
  addActiveCategory: (category: string) => void
  removeActiveCategory: (category: string) => void
  addBookmark: (bookmark: Bookmark, guid: string) => void
  removeBookmark: (guid: string) => void
  editBookmark: (bookmark: Partial<Bookmark>, guid: string) => void
}

export const BookmarkContext = createContext<BookmarkContext>({
  bookmarks: {},
  categories: [],
  activeCategories: [],
  addActiveCategory: () => null,
  removeActiveCategory: () => null,
  addBookmark: () => null,
  removeBookmark: () => null,
  editBookmark: () => null,
})

export const BookmarkContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmarks>(
    BOOKMARK_STORAGE_KEY,
    {}
  )
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmarks>(
    bookmarks
  )

  const [categories, setCategories] = useState<string[]>([])

  const [activeCategories, setActiveCategories] = useState<string[]>([])

  useEffect(() => {
    const bookmarkKeys = Object.keys(bookmarks)
    const categories = bookmarkKeys.reduce((acc: string[], key: string) => {
      return [...acc, bookmarks[key].category]
    }, [])
    setCategories(uniq(categories))
  }, [bookmarks])

  useEffect(() => {
    if (activeCategories.length > 0) {
      console.log("filtering categories")
      const filterBookmarks = Object.keys(bookmarks).reduce(
        (acc: Bookmarks, key: string) => {
          if (activeCategories.indexOf(bookmarks[key].category) > -1) {
            return {
              ...acc,
              [key]: bookmarks[key],
            }
          } else {
            return acc
          }
        },
        {} as Bookmarks
      )
      setFilteredBookmarks(filterBookmarks)
    } else {
      setFilteredBookmarks(bookmarks)
    }
  }, [bookmarks, categories, activeCategories])

  const addBookmark = (bookmark: Bookmark, guid: string) => {
    setBookmarks({
      ...bookmarks,
      [guid]: bookmark,
    })
  }
  const removeBookmark = (guid: string) => {
    const newState = omitKey(guid, bookmarks)
    setBookmarks(newState)
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
    }
  }

  const addActiveCategory = (category: string) => {
    setActiveCategories(uniq([...activeCategories, category]))
  }

  const removeActiveCategory = (category: string) => {
    setActiveCategories(removeItem(activeCategories, category))
  }

  const value: BookmarkContext = {
    bookmarks: filteredBookmarks,
    activeCategories,
    categories,
    addBookmark,
    editBookmark,
    removeBookmark,
    addActiveCategory,
    removeActiveCategory,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}

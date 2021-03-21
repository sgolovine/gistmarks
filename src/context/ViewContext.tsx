// Context for viewing bookmarks
// Mostly the same as bookmark context
// Except with functionality removed
// for adding and editing bookmarks
import React, { createContext, useEffect, useState } from "react"
import { removeItem, uniq } from "~/helpers"
import { filterByCategories, filterBySearchTerm } from "~/helpers/filtering"
import { validateStatus } from "~/helpers/validateStatus"
import { BookmarkCollection } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"
import { getGist } from "~/requests/getGist"
import { createInstance } from "~/requests/setup"

interface ViewContext {
  gistId: string | null
  bookmarks: BookmarkCollection
  categories: string[]
  activeCategories: string[]
  searchTerm: string
  gistLoading: boolean
  setGistId: (gistId: string) => void
  addActiveCategory: (category: string) => void
  removeActiveCategory: (category: string) => void
  setSearch: (newTerm: string) => void
}

export const ViewContext = createContext<ViewContext>({
  gistId: null,
  bookmarks: {},
  categories: [],
  activeCategories: [],
  searchTerm: "",
  gistLoading: false,
  setGistId: () => null,
  addActiveCategory: () => null,
  removeActiveCategory: () => null,
  setSearch: () => null,
})

export const BookmarkContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [gistLoading, setGistLoading] = useState<boolean>(false)

  const [gistId, setGistId] = useState<string | null>(null)

  const [bookmarks, setBookmarks] = useState<BookmarkCollection>({})

  const [
    filteredBookmarks,
    setFilteredBookmarks,
  ] = useState<BookmarkCollection>(bookmarks)

  const [categories, setCategories] = useState<string[]>([])

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [activeCategories, setActiveCategories] = useState<string[]>([])

  useEffect(() => {
    if (gistId) {
      fetchGist(gistId)
    }
  }, [gistId])

  useEffect(() => {
    const bookmarkKeys = Object.keys(bookmarks)
    const categories = bookmarkKeys.reduce((acc: string[], key: string) => {
      return [...acc, bookmarks[key].category]
    }, [])
    setCategories(uniq(categories))
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

  const addActiveCategory = (category: string) => {
    setActiveCategories(uniq([...activeCategories, category]))
  }

  const removeActiveCategory = (category: string) => {
    setActiveCategories(removeItem(activeCategories, category))
  }

  const setSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  const fetchGist = async (gistId: string) => {
    if (gistId) {
      setGistLoading(true)
      const instance = createInstance()
      const resp = await getGist(instance, gistId)

      if (resp && validateStatus(resp.status)) {
        setGistLoading(false)
        const allFiles = resp.data.files
        const firstFilename = Object.keys(allFiles)[0]
        const bookmarkContent = allFiles[firstFilename].content
        try {
          const parsedBookmarks = JSON.parse(bookmarkContent)
          setBookmarks(parsedBookmarks)
        } catch (e) {
          // TODO: Handle Error
          console.error(e)
        }
      } else {
        setGistLoading(false)
        // TODO: Handle Error
      }
    }
  }

  const value: ViewContext = {
    gistId,
    bookmarks: filteredBookmarks,
    activeCategories,
    categories,
    searchTerm,
    addActiveCategory,
    removeActiveCategory,
    setSearch,
    setGistId,
    gistLoading,
  }

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

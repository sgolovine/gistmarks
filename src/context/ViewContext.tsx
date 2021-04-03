// Context for viewing bookmarks
// Mostly the same as bookmark context
// Except with functionality removed
// for adding and editing bookmarks
import React, { createContext, useEffect, useState } from "react"
import { removeItem, uniq } from "~/helpers"
import { extractCategories } from "~/helpers/extractCategories"
import { filterByCategories, filterBySearchTerm } from "~/helpers/filtering"
import { validateStatus } from "~/helpers/validateStatus"
import { BookmarkCollection } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"
import { getGist } from "~/requests/getGist"
import { createInstance } from "~/requests/setup"

interface ViewContext {
  collectionName: string | null
  gistId: string | null
  bookmarks: BookmarkCollection
  categories: string[]
  activeCategories: string[]
  searchTerm: string
  gistLoading: boolean
  showError: boolean
  errorTitle: string
  errorMessage: string
  setGistId: (gistId: string) => void
  addActiveCategory: (category: string) => void
  removeActiveCategory: (category: string) => void
  setSearch: (newTerm: string) => void
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

const initialContextState: ViewContext = {
  collectionName: null,
  gistId: null,
  bookmarks: {},
  categories: [],
  activeCategories: [],
  searchTerm: "",
  gistLoading: false,
  showError: false,
  errorTitle: "",
  errorMessage: "",
  setGistId: () => null,
  addActiveCategory: () => null,
  removeActiveCategory: () => null,
  setSearch: () => null,
  setError: () => null,
}

export const ViewContext = createContext<ViewContext>(initialContextState)

export const ViewContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [collectionName, setCollectionName] = useState<string | null>(
    initialContextState.collectionName
  )

  const [gistLoading, setGistLoading] = useState<boolean>(
    initialContextState.gistLoading
  )

  const [gistId, setGistId] = useState<string | null>(
    initialContextState.gistId
  )

  const [bookmarks, setBookmarks] = useState<BookmarkCollection>(
    initialContextState.bookmarks
  )

  const [
    filteredBookmarks,
    setFilteredBookmarks,
  ] = useState<BookmarkCollection>(bookmarks)

  const [categories, setCategories] = useState<string[]>(
    initialContextState.categories
  )

  const [searchTerm, setSearchTerm] = useState<string>(
    initialContextState.searchTerm
  )

  const [activeCategories, setActiveCategories] = useState<string[]>(
    initialContextState.activeCategories
  )

  const [errorState, setErrorState] = useState<
    Pick<ViewContext, "errorMessage" | "errorTitle" | "showError">
  >({
    showError: initialContextState.showError,
    errorTitle: initialContextState.errorTitle,
    errorMessage: initialContextState.errorMessage,
  })

  useEffect(() => {
    if (gistId) {
      fetchGist(gistId)
    }
  }, [gistId])

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

  const addActiveCategory = (category: string) => {
    setActiveCategories(uniq([...activeCategories, category]))
  }

  const removeActiveCategory = (category: string) => {
    setActiveCategories(removeItem(activeCategories, category))
  }

  const setSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  const setError = ({
    show,
    title,
    msg,
  }: {
    show: boolean
    title: string
    msg: string
  }) => {
    setErrorState({
      showError: show,
      errorTitle: title,
      errorMessage: msg,
    })
  }

  const fetchGist = async (gistId: string) => {
    if (gistId) {
      setGistLoading(true)
      const instance = createInstance()
      const resp = await getGist(instance, gistId)
      if (resp && validateStatus(resp.status)) {
        setGistLoading(false)
        const allFiles = resp.data.files
        if (resp.data.description) {
          setCollectionName(resp.data.description)
        }
        const firstFilename = Object.keys(allFiles)[0]
        const gistContent = allFiles[firstFilename]
        const bookmarkContent = gistContent.content
        try {
          const parsedBookmarks = JSON.parse(bookmarkContent)
          setBookmarks(parsedBookmarks)
          // setCollectionName(gistContent.description)
        } catch (e) {
          setError({
            show: true,
            title: "Unable to fetch Gist",
            msg: "There was an error parsing the bookmarks",
          })
        }
      } else {
        setGistLoading(false)
        setError({
          show: true,
          title: "Unable to fetch Gist",
          msg: "There was an error fetching the gist from Github",
        })
      }
    } else {
      console.log("gist id not found")
    }
  }

  const value: ViewContext = {
    collectionName,
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
    showError: errorState.showError,
    errorTitle: errorState.errorTitle,
    errorMessage: errorState.errorMessage,
    setError,
  }

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

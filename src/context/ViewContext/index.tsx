import React, { ReactNode, useEffect } from "react"
import { createContext } from "react"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { ErrorArgs, ViewContextType } from "./types"
import { reducer, initialState } from "./reducer"
import { VIEW_STORAGE_KEY } from "~/defines"
import {
  extractCategories,
  filterByCategories,
  filterBySearchTerm,
  validateStatus,
} from "~/helpers"
import { getGist } from "~/requests/getGist"

export const ViewContext = createContext<ViewContextType>({} as ViewContextType)

export const ViewContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    VIEW_STORAGE_KEY,
  )

  useEffect(() => {
    if (state.gistId) {
      _fetchGist(state.gistId)
    }
  }, [state.gistId])

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
        state.searchTerm,
      )
      dispatch({
        type: "SET_BOOKMARKS",
        payload: filteredBookmarks,
      })
    } else if (state.activeCategories.length > 0) {
      const filteredBookmarks = filterByCategories(
        state.allBookmarks,
        state.activeCategories,
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

  const _fetchGist = async (gistId: string) => {
    if (gistId) {
      dispatch({
        type: "SET_GIST_LOADING",
        payload: true,
      })
      const resp = await getGist({
        gistId,
      })
      if (resp && validateStatus(resp.status)) {
        const allFiles = resp.data.files
        if (resp.data.description) {
          dispatch({
            type: "SET_COLLECTION_NAME",
            payload: resp.data.description,
          })
        }
        const firstFilename = Object.keys(allFiles)[0]
        const gistContent = allFiles[firstFilename]
        const bookmarkContent = gistContent.content
        try {
          const parsedBookmarks = JSON.parse(bookmarkContent)
          dispatch({
            type: "SET_ALL_BOOKMARKS",
            payload: parsedBookmarks,
          })
          dispatch({
            type: "SET_GIST_LOADING",
            payload: false,
          })
        } catch (e) {
          dispatch({
            type: "SET_GIST_LOADING",
            payload: false,
          })
          dispatch({
            type: "SET_ERROR",
            payload: {
              showError: true,
              errorTitle: "Unable to fetch Gist",
              errorMessage: "There was an error parsing the bookmarks",
            },
          })
        }
      } else {
        dispatch({
          type: "SET_GIST_LOADING",
          payload: false,
        })
        dispatch({
          type: "SET_ERROR",
          payload: {
            showError: true,
            errorTitle: "Unable to fetch Gist",
            errorMessage: "There was an error fetching the gist from Github",
          },
        })
      }
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: {
          showError: true,
          errorTitle: "Unable to fetch Gist",
          errorMessage: "GistID not found!",
        },
      })
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

  const setSearch = (searchTerm: string) => {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: searchTerm,
    })
  }

  const setGistId = (gistId: string) => {
    dispatch({
      type: "SET_GIST_ID",
      payload: gistId,
    })
  }

  const setError = ({ show, title, message }: ErrorArgs) => {
    dispatch({
      type: "SET_ERROR",
      payload: {
        showError: show,
        errorTitle: title,
        errorMessage: message,
      },
    })
  }

  const value: ViewContextType = {
    ...state,
    addActiveCategory,
    removeActiveCategory,
    setSearch,
    setGistId,
    setError,
  }

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

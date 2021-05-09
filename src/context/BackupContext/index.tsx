import React, { createContext, useContext } from "react"
import { BACKUP_STORAGE_KEY } from "~/defines"
import { validateStatus } from "~/helpers"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { ContextProviderProps } from "~/model/Context"
import { createGist } from "~/requests/createGist"
import { getGist } from "~/requests/getGist"
import { updateGist } from "~/requests/updateGist"
import { initialState, reducer } from "./reducer"
import { IBackupContext } from "./types"

// Legacy imports, change later.
import { AuthContext, BookmarkContext, SettingsContext } from "~/context"

export const BackupContext = createContext<IBackupContext>({} as IBackupContext)

export const BackupContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const authContext = useContext(AuthContext)
  const bookmarkContext = useContext(BookmarkContext)
  const settingsContext = useContext(SettingsContext)

  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    BACKUP_STORAGE_KEY
  )

  const setLoading = (payload: boolean) => {
    dispatch({ type: "SET_LOADING", payload })
  }

  const setFilename = (payload: string) => {
    dispatch({ type: "SET_FILENAME", payload })
  }

  const setName = (payload: string) => {
    dispatch({ type: "SET_NAME", payload })
  }

  const setGistId = (payload: string) => {
    dispatch({ type: "SET_GIST_ID", payload })
  }

  const setRemoteUrl = (payload: string) => {
    dispatch({ type: "SET_URL", payload })
  }

  const createBackup = async () => {
    if (authContext.accessToken) {
      setLoading(true)
      const filename = state.gistFilename ?? "bookmarks.json"
      const name = state.gistName ?? "Gistmarks"
      const resp = await createGist({
        token: authContext.accessToken,
        filename,
        name,
        bookmarks: bookmarkContext.bookmarks,
      })
      if (resp && validateStatus(resp.status)) {
        setLoading(false)
        settingsContext.setUnsavedChanges(false)
        const { html_url, id, description } = resp.data
        dispatch({
          type: "SET_RESULTS",
          payload: {
            gistId: id,
            htmlUrl: html_url,
            collectionName: description,
          },
        })
      } else {
        setLoading(false)
        // TODO: Handle Error Here
      }
    }
  }

  const updateBackup = async () => {
    if (authContext.accessToken && state.gistId) {
      setLoading(true)
      const filename = state.gistFilename ?? "bookmarks.json"
      const name = state.gistName ?? "Gistmarks"
      const resp = await updateGist({
        token: authContext.accessToken,
        gistId: state.gistId,
        filename,
        description: name,
        bookmarks: bookmarkContext.bookmarks,
      })
      if (resp && validateStatus(resp.status)) {
        setLoading(false)
        settingsContext.setUnsavedChanges(false)
        const { html_url, id, description } = resp.data
        dispatch({
          type: "SET_RESULTS",
          payload: {
            gistId: id,
            htmlUrl: html_url,
            collectionName: description,
          },
        })
      } else {
        setLoading(false)
      }
    }
  }

  const restoreBackup = async () => {
    if (state.gistId && authContext.accessToken) {
      setLoading(true)

      const resp = await getGist({
        token: authContext.accessToken,
        gistId: state.gistId,
      })
      if (resp && validateStatus(resp.status)) {
        setLoading(false)
        const allFiles = resp.data.files

        if (resp.data.description) {
          dispatch({ type: "SET_NAME", payload: resp.data.description })
        }

        if (resp.data.html_url) {
          dispatch({ type: "SET_URL", payload: resp.data.html_url })
        }

        const firstFilename = Object.keys(allFiles)[0]

        if (firstFilename) {
          dispatch({ type: "SET_FILENAME", payload: firstFilename })
        }
        dispatch({ type: "SET_BACKUP_CREATED", payload: true })
        const bookmarkContent = allFiles[firstFilename].content
        bookmarkContext.restoreBookmarks(bookmarkContent)
      } else {
        setLoading(false)
        // TODO: Handle Error
      }
    }
  }

  const deleteBackup = () => dispatch({ type: "DELETE_BACKUP" })

  const value: IBackupContext = {
    // State
    ...state,

    // Setters
    setLoading,
    setFilename,
    setName,
    setGistId,
    setRemoteUrl,

    // Other actions
    createBackup,
    updateBackup,
    restoreBackup,
    deleteBackup,
  }

  return (
    <BackupContext.Provider value={value}>{children}</BackupContext.Provider>
  )
}

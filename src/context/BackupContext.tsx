import React, { createContext, useContext } from "react"
import { BACKUP_STORAGE_KEY } from "~/defines"
import { validateStatus } from "~/helpers"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { AppAction, ContextProviderProps } from "~/model/Context"
import { createGist } from "~/requests/createGist"
import { getGist } from "~/requests/getGist"
import { createInstance } from "~/requests/setup"
import { updateGist } from "~/requests/updateGist"
import { AuthContext } from "./AuthContext"
import { BookmarkContext } from "./BookmarkContext"
import { SettingsContext } from "./SettingsContext"

type ActionTypes =
  | "SET_FILENAME"
  | "SET_NAME"
  | "SET_LOADING"
  | "SET_GIST_ID"
  | "SET_URL"
  | "SET_BACKUP_CREATED"
  | "DELETE_BACKUP"
  | "SET_RESULTS"

type BackupState = {
  isLoading: boolean
  backupCreated: boolean
  gistFilename: string | null
  gistName: string | null
  gistId: string | null
  remoteUrl: string | null
}

const initialState: BackupState = {
  isLoading: false,
  backupCreated: false,
  gistFilename: null,
  gistName: null,
  gistId: null,
  remoteUrl: null,
}

function reducer(
  state: BackupState,
  action: AppAction<ActionTypes>
): BackupState {
  switch (action.type) {
    case "SET_FILENAME":
      return {
        ...state,
        gistFilename: action.payload,
      }
    case "SET_NAME":
      return {
        ...state,
        gistName: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_GIST_ID":
      return {
        ...state,
        gistId: action.payload,
      }
    case "SET_URL":
      return {
        ...state,
        remoteUrl: action.payload,
      }
    case "SET_BACKUP_CREATED":
      return {
        ...state,
        backupCreated: action.payload,
      }
    case "SET_RESULTS": {
      return {
        ...state,
        gistId: action.payload.gistId,
        remoteUrl: action.payload.htmlUrl,
        gistName: action.payload.collectionName,
        backupCreated: true,
      }
    }
    case "DELETE_BACKUP":
      return initialState
    default:
      return state
  }
}

interface BackupContext {
  state: BackupState
  actions: {
    // Field Setters
    setLoading: (newValue: boolean) => void
    setFilename: (newValue: string) => void
    setName: (newValue: string) => void
    setGistId: (newValue: string) => void
    setRemoteUrl: (newValue: string) => void
    // Other actions
    createBackup: () => void
    updateBackup: () => void
    restoreBackup: () => void
    deleteBackup: () => void
  }
}

export const BackupContext = createContext<BackupContext>({} as BackupContext)

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
      const instance = createInstance(authContext.accessToken)
      const filename = state.gistFilename ?? "bookmarks.json"
      const name = state.gistName ?? "Gistmarks"
      const resp = await createGist(
        instance,
        filename,
        name,
        bookmarkContext.bookmarks
      )
      if (resp && validateStatus(resp.status)) {
        setLoading(false)
        settingsContext.actions.setUnsavedChanges(false)
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
      const instance = createInstance(authContext.accessToken)
      const filename = state.gistFilename ?? "bookmarks.json"
      const name = state.gistName ?? "Gistmarks"
      const resp = await updateGist({
        instance,
        gistId: state.gistId,
        filename,
        description: name,
        bookmarks: bookmarkContext.bookmarks,
      })
      if (resp && validateStatus(resp.status)) {
        setLoading(false)
        settingsContext.actions.setUnsavedChanges(false)
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

  // TODO: This should be converted to an "authenticated"
  // function. Whenever the user restores a backup
  // they should be prompted to login and can only
  // restore a backup that they "own"

  // Also add a field to the UI that lets the user view another
  // backup. This will simply redirect to /v/:gistID
  const restoreBackup = async () => {
    if (state.gistId) {
      setLoading(true)
      const instance = createInstance()

      const resp = await getGist(instance, state.gistId)
      if (resp && validateStatus(resp.status)) {
        setLoading(false)
        const allFiles = resp.data.files

        if (resp.data.description) {
          dispatch({ type: "SET_NAME", payload: resp.data.description })
        }
        const firstFilename = Object.keys(allFiles)[0]
        const bookmarkContent = allFiles[firstFilename].content
        bookmarkContext.restoreBookmarks(bookmarkContent)
      } else {
        setLoading(false)
        // TODO: Handle Error
      }
    }
  }

  const deleteBackup = () => dispatch({ type: "DELETE_BACKUP" })

  const value: BackupContext = {
    state,
    actions: {
      setLoading,
      setFilename,
      setName,
      setGistId,
      setRemoteUrl,

      createBackup,
      updateBackup,
      restoreBackup,
      deleteBackup,
    },
  }

  return (
    <BackupContext.Provider value={value}>{children}</BackupContext.Provider>
  )
}

import React, { useEffect, createContext, useContext } from "react"
import { GH_DEFAULT_FILENAME } from "~/defines"
import {
  GIST_BACKUP_RESULT_STATE,
  GIST_BACKUP_STATE,
  GIST_RESTORE_STATE,
} from "~/defines/localStorage"
import { validateStatus } from "~/helpers/validateStatus"
import useLocalStorage from "~/hooks/useLocalStorage"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { AppAction, ContextProviderProps } from "~/model/Context"
import { createGist } from "~/requests/createGist"
import { getGist } from "~/requests/getGist"
import { createInstance } from "~/requests/setup"
import { updateGist } from "~/requests/updateGist"
import { AuthContext } from "./AuthContext"
import { BookmarkContext } from "./BookmarkContext"
import { GlobalStateContext } from "./GlobalStateContext"

type ActionTypes =
  // RESTORE
  | "backupContext/restore/SET_FILENAME"
  | "backupContext/restore/SET_GIST_ID"
  // BACKUP
  | "backupContext/backup/SET_LOADING"
  | "backupContext/backup/SET_FILENAME"
  | "backupContext/backup/SET_NAME"
  | "backupContext/backup/SET_GIST_ID"
  // RESULTS
  | "backupContext/results/SET_ALL"
  | "backupContext/results/SET_GIST_ID"
  | "backupContext/results/SET_NAME"
  | "backupContext/results/SET_URL"
  | "backupContext/results/SET_BACKUP_CREATED"

type BackupState = {
  restore: {
    filename: string
    gistId: string
  }
  backup: {
    backupLoading: boolean
    filename: string
    collectionName: string
    gistId: string
  }
  results: {
    gistId: string
    collectionName: string
    htmlUrl: string
    backupCreated: boolean
  }
}

const initialState: BackupState = {
  restore: {
    filename: "",
    gistId: "",
  },
  backup: {
    backupLoading: false,
    filename: "",
    collectionName: "",
    gistId: "",
  },
  results: {
    gistId: "",
    collectionName: "",
    htmlUrl: "",
    backupCreated: false,
  },
}

function reducer(
  state: BackupState,
  action: AppAction<ActionTypes>
): BackupState {
  switch (action.type) {
    case "backupContext/restore/SET_FILENAME":
      return {
        ...state,
        restore: {
          ...state.restore,
          filename: action.payload,
        },
      }
    case "backupContext/restore/SET_GIST_ID":
      return {
        ...state,
        restore: {
          ...state.restore,
          gistId: action.payload,
        },
      }
    case "backupContext/backup/SET_FILENAME":
      return {
        ...state,
        backup: {
          ...state.backup,
          filename: action.payload,
        },
      }
    case "backupContext/backup/SET_GIST_ID":
      return {
        ...state,
        backup: {
          ...state.backup,
          gistId: action.payload,
        },
      }
    case "backupContext/backup/SET_LOADING":
      return {
        ...state,
        backup: {
          ...state.backup,
          backupLoading: action.payload,
        },
      }
    case "backupContext/backup/SET_NAME":
      return {
        ...state,
        backup: {
          ...state.backup,
          filename: action.payload,
        },
      }
    case "backupContext/results/SET_ALL": {
      return {
        ...state,
        results: action.payload,
      }
    }
    case "backupContext/results/SET_BACKUP_CREATED":
      return {
        ...state,
        results: {
          ...state.results,
          backupCreated: action.payload,
        },
      }
    case "backupContext/results/SET_GIST_ID":
      return {
        ...state,
        results: {
          ...state.results,
          gistId: action.payload,
        },
      }
    case "backupContext/results/SET_NAME":
      return {
        ...state,
        results: {
          ...state.results,
          collectionName: action.payload,
        },
      }
    case "backupContext/results/SET_URL":
      return {
        ...state,
        results: {
          ...state.results,
          htmlUrl: action.payload,
        },
      }
    default:
      return state
  }
}

interface GistRestore {
  filename: string
  gistId: string
}

interface GistBackup {
  backupLoading: boolean
  filename: string
  collectionName: string
  gistId: string
}

interface BackupResults {
  gistId: string
  collectionName: string
  htmlUrl: string
  backupCreated: boolean
}

interface BackupContext {
  gistRestore: GistRestore & {
    setField: (field: keyof GistRestore, value: string) => void
  }
  gistBackup: GistBackup & {
    setField: (field: keyof GistBackup, value: string | boolean) => void
  }
  backupResults: BackupResults & {
    setField: (field: keyof BackupResults, value: string) => void
    setState: (results: BackupResults) => void
  }
  actions: {
    createBackup: () => void
    updateBackup: () => void
    restoreBackup: () => void
    deleteBackup: () => void
  }
}

const initialBackupState: GistBackup = {
  backupLoading: false,
  filename: GH_DEFAULT_FILENAME,
  collectionName: "",
  gistId: "",
}

const initialBackupResultsState: BackupResults = {
  gistId: "",
  collectionName: "",
  htmlUrl: "",
  backupCreated: false,
}

export const BackupContext = createContext<BackupContext>({} as BackupContext)

export const BackupContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const authContext = useContext(AuthContext)
  const bookmarkContext = useContext(BookmarkContext)
  const globalStateContext = useContext(GlobalStateContext)

  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    "NEW_BACKUP_STORAGE_KEY"
  )

  const createBackup = async () => {
    if (authContext.accessToken) {
      dispatch({ type: "backupContext/backup/SET_LOADING", payload: true })
      const instance = createInstance(authContext.accessToken)
      const resp = await createGist(
        instance,
        state.backup.filename,
        state.backup.collectionName,
        bookmarkContext.bookmarks
      )
      if (resp && validateStatus(resp.status)) {
        dispatch({ type: "backupContext/backup/SET_LOADING", payload: false })
        globalStateContext.setUnsavedChanges(false)
        const { html_url, id, description } = resp.data
        dispatch({
          type: "backupContext/results/SET_ALL",
          payload: {
            gistId: id,
            htmlUrl: html_url,
            collectionName: description,
            backupCreated: true,
          },
        })
      } else {
        dispatch({ type: "backupContext/backup/SET_LOADING", payload: false })
        // TODO: Handle Error Here
      }
    }
  }

  const updateBackup = async () => {
    if (authContext.accessToken && state.backup.gistId) {
      dispatch({ type: "backupContext/backup/SET_LOADING", payload: true })
      const instance = createInstance(authContext.accessToken)

      const resp = await updateGist({
        instance,
        gistId: state.backup.gistId,
        filename: state.backup.filename,
        description: state.backup.collectionName,
        bookmarks: bookmarkContext.bookmarks,
      })
      if (resp && validateStatus(resp.status)) {
        dispatch({ type: "backupContext/backup/SET_LOADING", payload: false })
        globalStateContext.setUnsavedChanges(false)
        const { html_url, id, description } = resp.data
        dispatch({
          type: "backupContext/results/SET_ALL",
          payload: {
            gistId: id,
            htmlUrl: html_url,
            collectionName: description,
            backupCreated: true,
          },
        })
      } else {
        dispatch({ type: "backupContext/backup/SET_LOADING", payload: false })
      }
    }
  }

  const restoreBackup = async () => {
    if (state.restore.filename && state.restore.gistId) {
      setBackupField("backupLoading", true)
      const instance = createInstance()

      const resp = await getGist(instance, restoreState.gistId)
      if (resp && validateStatus(resp.status)) {
        setBackupField("backupLoading", false)
        const allFiles = resp.data.files
        if (resp.data.description) {
          setBackupField("collectionName", resp.data.description)
        }
        const firstFilename = Object.keys(allFiles)[0]
        const bookmarkContent = allFiles[firstFilename].content
        bookmarkContext.restoreBookmarks(bookmarkContent)
      } else {
        setBackupField("backupLoading", false)
        // TODO: Handle Error
      }
    }
  }

  const deleteBackup = () => {
    setBackupState(initialBackupState)
    setBackupResultsState(initialBackupResultsState)
  }

  useEffect(() => {
    if (backupResultsState.gistId) {
      setBackupField("gistId", backupResultsState.gistId)
    }
  }, [backupResultsState.gistId])

  const value: BackupContext = {
    gistBackup: {
      ...backupState,
      setField: (field, value) => setBackupField(field, value),
    },
    gistRestore: {
      ...restoreState,
      setField: (field, value) => setRestoreField(field, value),
    },
    backupResults: {
      ...backupResultsState,
      setField: (field, value) => setBackupResultsField(field, value),
      setState: (state) => setBackupResultsState(state),
    },
    actions: {
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

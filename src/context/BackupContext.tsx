import React, { useEffect, createContext, useContext } from "react"
import { GH_DEFAULT_FILENAME } from "~/defines"
import {
  GIST_BACKUP_RESULT_STATE,
  GIST_BACKUP_STATE,
  GIST_RESTORE_STATE,
} from "~/defines/localStorage"
import { validateStatus } from "~/helpers/validateStatus"
import useLocalStorage from "~/hooks/useLocalStorage"
import { ContextProviderProps } from "~/model/Context"
import { createGist } from "~/requests/createGist"
import { getGist } from "~/requests/getGist"
import { createInstance } from "~/requests/setup"
import { updateGist } from "~/requests/updateGist"
import { AuthContext } from "./AuthContext"
import { BookmarkContext } from "./BookmarkContext"
import { GlobalStateContext } from "./GlobalStateContext"

// TODO: Complete Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GistBackupResultState = any

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

  const [backupState, setBackupState] = useLocalStorage<GistBackup>(
    GIST_BACKUP_STATE,
    initialBackupState
  )

  const [
    backupResultsState,
    setBackupResultsState,
  ] = useLocalStorage<BackupResults>(
    GIST_BACKUP_RESULT_STATE,
    initialBackupResultsState
  )

  const [restoreState, setRestoreState] = useLocalStorage<GistRestore>(
    GIST_RESTORE_STATE,
    {
      filename: GH_DEFAULT_FILENAME,
      gistId: "",
    }
  )

  const setBackupField = (field: keyof GistBackup, value: string | boolean) =>
    setBackupState({ ...backupState, [field]: value })

  const setRestoreField = (field: keyof GistRestore, value: string) =>
    setRestoreState({ ...restoreState, [field]: value })

  const setBackupResultsField = (
    field: keyof GistBackupResultState,
    value: string
  ) => setBackupResultsState({ ...backupResultsState, [field]: value })

  const createBackup = async () => {
    if (authContext.accessToken) {
      setBackupField("backupLoading", true)
      const instance = createInstance(authContext.accessToken)
      const resp = await createGist(
        instance,
        backupState.filename,
        backupState.collectionName,
        bookmarkContext.bookmarks
      )
      if (resp && validateStatus(resp.status)) {
        setBackupField("backupLoading", false)
        globalStateContext.setUnsavedChanges(false)
        const { html_url, id, description } = resp.data
        setBackupResultsState({
          gistId: id,
          htmlUrl: html_url,
          collectionName: description,
          backupCreated: true,
        })
      } else {
        setBackupField("backupLoading", false)
        // TODO: Handle Error Here
      }
    }
  }

  const updateBackup = async () => {
    if (authContext.accessToken && backupState.gistId) {
      setBackupField("backupLoading", true)
      const instance = createInstance(authContext.accessToken)

      const resp = await updateGist({
        instance,
        gistId: backupState.gistId,
        filename: backupState.filename,
        description: backupState.collectionName,
        bookmarks: bookmarkContext.bookmarks,
      })
      if (resp && validateStatus(resp.status)) {
        setBackupField("backupLoading", false)
        globalStateContext.setUnsavedChanges(false)
        const { html_url, id, description } = resp.data
        setBackupResultsState({
          gistId: id,
          htmlUrl: html_url,
          collectionName: description,
          backupCreated: true,
        })
      } else {
        setBackupField("backupLoading", false)
        // TODO: Handle Error Here
      }
    }
  }

  const restoreBackup = async () => {
    if (restoreState.filename && restoreState.gistId) {
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

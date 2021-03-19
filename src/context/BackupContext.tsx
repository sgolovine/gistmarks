import React, { useEffect, createContext } from "react"
import { GistBackupResultState } from "~/components/panels/save/GistBackup"
import {
  GIST_BACKUP_RESULT_STATE,
  GIST_BACKUP_STATE,
  GIST_OPTIONS_STATE,
  GIST_RESTORE_STATE,
} from "~/defines/localStorage"
import useLocalStorage from "~/hooks/useLocalStorage"
import { ContextProviderProps } from "~/model/Context"

interface GistRestore {
  filename: string
  gistId: string
}

interface GistBackup {
  backupLoading: boolean
  filename: string
  description: string
  gistId: string
}

interface BackupResults {
  gistId: string
  description: string
  htmlUrl: string
  backupCreated: boolean
}

interface Options {
  autoSave: boolean
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
  options: Options & {
    setField: (field: keyof Options, value: boolean) => void
  }
}

export const BackupContext = createContext<BackupContext>({} as BackupContext)

export const BackupContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [backupState, setBackupState] = useLocalStorage<GistBackup>(
    GIST_BACKUP_STATE,
    {
      backupLoading: false,
      filename: "",
      description: "",
      gistId: "",
    }
  )

  const [
    backupResultsState,
    setBackupResultsState,
  ] = useLocalStorage<BackupResults>(GIST_BACKUP_RESULT_STATE, {
    gistId: "",
    description: "",
    htmlUrl: "",
    backupCreated: false,
  })

  const [restoreState, setRestoreState] = useLocalStorage<GistRestore>(
    GIST_RESTORE_STATE,
    {
      filename: "",
      gistId: "",
    }
  )

  const [optionsState, setOptionsState] = useLocalStorage<Options>(
    GIST_OPTIONS_STATE,
    {
      autoSave: false,
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

  const setOptionsField = (field: keyof Options, value: boolean) =>
    setOptionsState({ [field]: value })

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
    options: {
      ...optionsState,
      setField: (field, value) => setOptionsField(field, value),
    },
  }

  return (
    <BackupContext.Provider value={value}>{children}</BackupContext.Provider>
  )
}

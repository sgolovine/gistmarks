export type ActionTypes =
  | "SET_FILENAME"
  | "SET_NAME"
  | "SET_LOADING"
  | "SET_GIST_ID"
  | "SET_URL"
  | "SET_BACKUP_CREATED"
  | "DELETE_BACKUP"
  | "SET_RESULTS"

export interface IBackupContext {
  isLoading: boolean
  backupCreated: boolean
  gistFilename: string | null
  gistName: string | null
  gistId: string | null
  remoteUrl: string | null
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

export type BackupState = Pick<
  IBackupContext,
  | "isLoading"
  | "backupCreated"
  | "gistFilename"
  | "gistName"
  | "gistId"
  | "remoteUrl"
>

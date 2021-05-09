import { AppAction } from "~/model/Context"
import { ActionTypes, BackupState } from "./types"

export const initialState: BackupState = {
  isLoading: false,
  backupCreated: false,
  gistFilename: null,
  gistName: null,
  gistId: null,
  remoteUrl: null,
}

export function reducer(
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

import { AppAction } from "~/model/Context"
import { AuthState, ActionTypes } from "./types"

export const initialState: AuthState = {
  authCode: null,
  accessToken: null,
  scope: null,
  tokenType: null,
}

export function reducer(
  state: AuthState = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: AppAction<ActionTypes>
): AuthState {
  switch (action.type) {
    case "SET_AUTH_CODE":
      return {
        ...state,
        authCode: action.payload,
      }
    case "SET_CREDENTIALS":
      return {
        ...state,
        authCode: action.payload.authCode,
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
        scope: action.payload.scope,
      }
    default:
      return state
  }
}

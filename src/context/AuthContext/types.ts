export interface IAuthContext {
  authCode: string | null
  accessToken: string | null
  scope: string | null
  tokenType: string | null
  isLoggedIn: boolean
  logout: () => void
  login: () => void
  loginWithPat: (token: string) => void
}

export type AuthState = Pick<
  IAuthContext,
  "authCode" | "accessToken" | "scope" | "tokenType"
>

export type ActionTypes = "SET_AUTH_CODE" | "SET_CREDENTIALS"

import React, { useEffect, createContext } from "react"
import { ContextProviderProps } from "~/model/Context"
import axios from "axios"
import { AUTH_STORAGE_KEY } from "~/defines/localStorage"
import { ContextDevTool } from "react-context-devtool"
import useLocalStorage from "~/hooks/useLocalStorage"
import {
  buildAuthUrl,
  getCodeFromUrl,
  navigate,
  removeCodeInUrl,
  dev,
} from "~/helpers"

interface AuthContext {
  authCode: string | null
  accessToken: string | null
  scope: string | null
  tokenType: string | null
  isLoggedIn: boolean
  logout: () => void
  login: () => void
  loginWithPat: (token: string) => void
}

type AuthState = Pick<
  AuthContext,
  "authCode" | "accessToken" | "scope" | "tokenType"
>

export const AuthContext = createContext<AuthContext>({
  authCode: null,
  accessToken: null,
  scope: null,
  tokenType: null,
  isLoggedIn: false,
  logout: () => null,
  login: () => null,
  loginWithPat: () => null,
})

export const AuthContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [authState, setAuthState] = useLocalStorage<AuthState>(
    AUTH_STORAGE_KEY,
    {
      authCode: null,
      accessToken: null,
      scope: null,
      tokenType: null,
    }
  )

  // Once we are redirected back from github, look at the URL
  // and grab the code
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.search.includes("?code=")) {
        const code = getCodeFromUrl(window.location.toString())
        if (code) {
          setState("authCode", code)
        }
        removeCodeInUrl()
      }
    }
  }, [])

  // After we get an authcode, call out to our API to get
  // the access token
  useEffect(() => {
    if (authState.authCode && authState.authCode !== null) {
      axios
        .post("/api/authWithGithub", {
          code: authState.authCode,
        })
        .then((resp) => {
          const { accessToken, tokenType, scope } = resp.data
          // const interceptorID = injectAuthInterceptor(accessToken)
          // setInterceptorID(interceptorID)
          setAuthState({
            ...authState,
            // Set the auth code to null
            // upon success to prevent
            // caching issues
            authCode: null,
            accessToken,
            tokenType,
            scope,
          })
        })
    }
  }, [authState.authCode])

  const setState = (key: keyof AuthState, value: string) =>
    setAuthState({ ...authState, [key]: value })

  const logout = () => {
    setAuthState({
      authCode: null,
      accessToken: null,
      scope: null,
      tokenType: null,
    })
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const login = () => {
    const authUrl = buildAuthUrl()
    navigate(authUrl)
  }

  const loginWithPat = (token: string) => {
    setAuthState({
      authCode: null,
      accessToken: token,
      scope: null,
      tokenType: null,
    })
  }

  const providerValue: AuthContext = {
    authCode: authState.authCode,
    accessToken: authState.accessToken,
    scope: authState.scope,
    tokenType: authState.tokenType,
    isLoggedIn: !!authState.accessToken,
    logout,
    login,
    loginWithPat,
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
      {dev && (
        <ContextDevTool
          context={AuthContext}
          id="authContext"
          displayName="Auth Context"
        />
      )}
    </AuthContext.Provider>
  )
}

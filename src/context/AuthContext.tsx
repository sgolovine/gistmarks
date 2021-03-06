import React, { useState, useEffect, createContext, ReactNode } from "react"
import { ContextProviderProps } from "~/model/Context"
import axios from "axios"
import { AUTH_STORAGE_KEY } from "~/defines/localStorage"

interface AuthContext {
  authCode: string | null
  accessToken: string | null
  scope: string | null
  tokenType: string | null
  isLoggedIn: boolean
  logout: () => void
}

type AuthState = Pick<
  AuthContext,
  "authCode" | "accessToken" | "scope" | "tokenType"
>

export const authContext = createContext<AuthContext>({
  authCode: null,
  accessToken: null,
  scope: null,
  tokenType: null,
  isLoggedIn: false,
  logout: () => null,
})

export const AuthContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    authCode: null,
    accessToken: null,
    scope: null,
    tokenType: null,
  })

  // Helper function - set state
  const setState = (key: keyof AuthState, value: string) =>
    setAuthState({ ...authState, [key]: value })

  // Helper function - persist state
  const persistState = ({
    authCode,
    accessToken,
    scope,
    tokenType,
  }: AuthState) => {
    const value = JSON.stringify({
      authCode,
      accessToken,
      scope,
      tokenType,
    })
    localStorage.setItem(AUTH_STORAGE_KEY, value)
  }

  const logout = () => {
    setAuthState({
      authCode: null,
      accessToken: null,
      scope: null,
      tokenType: null,
    })
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const providerValue: AuthContext = {
    authCode: authState.authCode,
    accessToken: authState.accessToken,
    scope: authState.scope,
    tokenType: authState.tokenType,
    isLoggedIn:
      !!authState.accessToken && !!authState.scope && !!authState.tokenType,
    logout,
  }

  // Once we are redirected back from github, look at the URL
  // and grab the code
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.search.includes("?code=")) {
        const code = window.location.search.replace("?code=", "")
        setState("authCode", code)
      }
    }
  }, [])

  // Rehydrate context from local storage
  useEffect(() => {
    const authState = localStorage.getItem(AUTH_STORAGE_KEY)
    if (authState) {
      const value = JSON.parse(authState)
    }
  }, [])

  // After we get an authcode, call out to our API to get
  // the access token
  useEffect(() => {
    if (authState.authCode) {
      axios
        .post("/api/authWithGithub", {
          code: authState.authCode,
        })
        .then((resp) => {
          const { accessToken, tokenType, scope } = resp.data
          setAuthState({
            ...authState,
            accessToken,
            tokenType,
            scope,
          })
          persistState({
            authCode: authState.authCode,
            accessToken: accessToken,
            scope: scope,
            tokenType: tokenType,
          })
        })
    }
  }, [authState.authCode])

  return (
    <authContext.Provider value={providerValue}>
      {children}
    </authContext.Provider>
  )
}

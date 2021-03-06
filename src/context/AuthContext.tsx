import React, { useState, useEffect, createContext, ReactNode } from "react"
import { ContextProviderProps } from "~/model/Context"
import axios from "axios"
import { AUTH_STORAGE_KEY } from "~/defines/localStorage"

interface AuthContext {
  authCode: string | null
  accessToken: string | null
  scope: string | null
  tokenType: string | null
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

  const setState = (key: keyof AuthState, value: string) =>
    setAuthState({ ...authState, [key]: value })

  const persistState = ({
    authCode,
    accessToken,
    scope,
    tokenType,
  }: AuthState) => {
    console.log("[DEV] [AUTH] Persisting State")
    const value = JSON.stringify({
      authCode,
      accessToken,
      scope,
      tokenType,
    })
    localStorage.setItem(AUTH_STORAGE_KEY, value)
  }

  const providerValue: AuthContext = {
    authCode: authState.authCode,
    accessToken: authState.accessToken,
    scope: authState.scope,
    tokenType: authState.tokenType,
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.search.includes("?code=")) {
        const code = window.location.search.replace("?code=", "")
        setState("authCode", code)
      }
    }
  }, [])

  useEffect(() => {
    const authState = localStorage.getItem(AUTH_STORAGE_KEY)
    if (authState) {
      const value = JSON.parse(authState)
      console.log("[DEV] [AUTH] STATE RETURNED", value)
    }
  }, [])

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

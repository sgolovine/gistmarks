import React, { useState, useEffect, createContext, ReactNode } from "react"
import { ContextProviderProps } from "~/model/Context"
import axios from "axios"
import { AUTH_STORAGE_KEY } from "~/defines/localStorage"
import { makePublicRouterInstance, useRouter } from "next/router"
import { ContextDevTool } from "react-context-devtool"

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

export const AuthContext = createContext<AuthContext>({
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
  const router = useRouter()

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
  const persistState = ({ accessToken, scope, tokenType }: AuthState) => {
    const value = JSON.stringify({
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

  // Rehydrate context from local storage
  useEffect(() => {
    // If the URL bar contains a ?code=, then we know that
    // We are currently in the auth flow and we should
    // ignore rehydration
    if (
      typeof window !== undefined &&
      window.location.search.includes("?code=")
    ) {
      return
    } else {
      const persistedAuthState = localStorage.getItem(AUTH_STORAGE_KEY)
      if (persistedAuthState) {
        const value = JSON.parse(persistedAuthState)
        const { accessToken, tokenType, scope } = value
        setAuthState({
          ...authState,
          accessToken,
          tokenType,
          scope,
        })
      }
    }
  }, [])

  // Once we are redirected back from github, look at the URL
  // and grab the code
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.search.includes("?code=")) {
        const code = window.location.search.replace("?code=", "")
        setState("authCode", code)
        // Now remove the code from the URL bar
        router.replace("/", undefined, { shallow: true })
      }
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
    <AuthContext.Provider value={providerValue}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ContextDevTool
          context={AuthContext}
          id="authContext"
          displayName="Auth Context"
        />
      )}
    </AuthContext.Provider>
  )
}

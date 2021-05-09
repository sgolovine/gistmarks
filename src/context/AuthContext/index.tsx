import axios from "axios"
import React, { createContext, useEffect } from "react"
import { AUTH_STORAGE_KEY } from "~/defines"
import {
  buildAuthUrl,
  getCodeFromUrl,
  navigate,
  removeCodeInUrl,
} from "~/helpers"
import { usePersistedReducer } from "~/hooks/usePersistedReducer"
import { initialState, reducer } from "./reducer"
import { IAuthContext } from "./types"

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider: React.FC = ({ children }) => {
  const { state, dispatch } = usePersistedReducer(
    reducer,
    initialState,
    AUTH_STORAGE_KEY
  )

  // Once we are redirected back from github, look at the URL
  // and grab the code
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.search.includes("?code=")) {
        const code = getCodeFromUrl(window.location.toString())
        if (code) {
          dispatch({ type: "SET_AUTH_CODE", payload: code })
        }
        removeCodeInUrl()
      }
    }
  }, [])

  // After we get an authcode, call out to our API to get
  // the access token
  useEffect(() => {
    if (state.authCode && state.authCode !== null) {
      axios
        .post("/api/authWithGithub", {
          code: state.authCode,
        })
        .then((resp) => {
          const { accessToken, tokenType, scope } = resp.data
          dispatch({
            type: "SET_CREDENTIALS",
            payload: {
              authCode: null,
              accessToken,
              tokenType,
              scope,
            },
          })
        })
    }
  }, [state.authCode])

  const login = () => {
    const authUrl = buildAuthUrl()
    navigate(authUrl)
  }

  const logout = () => {
    dispatch({
      type: "SET_CREDENTIALS",
      payload: {
        authCode: null,
        accessToken: null,
        scope: null,
        tokenType: null,
      },
    })
    // TODO: Clear keys from storage
  }

  const loginWithPat = (token: string) => {
    dispatch({
      type: "SET_CREDENTIALS",
      payload: {
        authCode: null,
        accessToken: token,
        scope: null,
        tokenType: null,
      },
    })
  }

  const value: IAuthContext = {
    ...state,
    isLoggedIn: !!state.accessToken,
    login,
    logout,
    loginWithPat,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

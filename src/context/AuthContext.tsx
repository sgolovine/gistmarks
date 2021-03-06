import React, { useState, useEffect, createContext, ReactNode } from "react"
import { ContextProviderProps } from "~/model/Context"

interface AuthContext {
  authCode: string
  setAuthCode: (code: string) => void
}

export const authContext = createContext<AuthContext>({
  authCode: "",
  setAuthCode: () => null,
})

export const AuthContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [authCode, setAuthCode] = useState("")

  const providerValue: AuthContext = {
    authCode,
    setAuthCode,
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.location.search.includes("?code=")) {
        const code = window.location.search.replace("?code=", "")
        setAuthCode(code)
      }
    }
  }, [])

  return (
    <authContext.Provider value={providerValue}>
      {children}
    </authContext.Provider>
  )
}

import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import React, { ReactNode, useContext, useEffect } from "react"
import {
  AuthContextProvider,
  BackupContextProvider,
  EditorStateContextProvider,
  BookmarkContextProvider,
  ViewContextProvider,
  LayoutContextProvider,
  SettingsContextProvider,
  SettingsContext,
} from "~/context"
import { darkTheme, lightTheme } from "~/defines/theme"
import { ejectInterceptor, injectBaseInterceptor } from "~/requests/setup"
import { AppRouter } from "~/routes/router"

interface WrapperProps {
  children: ReactNode
}

// Contexts used by the app
const ContextWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <SettingsContextProvider>
      <AuthContextProvider>
        <LayoutContextProvider>
          <BookmarkContextProvider>
            <EditorStateContextProvider>
              <BackupContextProvider>
                <ViewContextProvider>{children}</ViewContextProvider>
              </BackupContextProvider>
            </EditorStateContextProvider>
          </BookmarkContextProvider>
        </LayoutContextProvider>
      </AuthContextProvider>
    </SettingsContextProvider>
  )
}

const ThemeWrapper: React.FC<WrapperProps> = ({ children }) => {
  const { state } = useContext(SettingsContext)
  const theme = state.isDark ? darkTheme : lightTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default function App() {
  useEffect(() => {
    const interceptor = injectBaseInterceptor()

    return function cleanup() {
      ejectInterceptor(interceptor)
    }
  }, [])

  return (
    <ContextWrapper>
      <ThemeWrapper>
        {/* CSS Reset */}
        <CssBaseline />

        {/* Router */}
        <AppRouter />
      </ThemeWrapper>
    </ContextWrapper>
  )
}

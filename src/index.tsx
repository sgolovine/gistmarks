import React, { ReactNode, useContext } from "react"
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
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
import { AnalyticsProvider } from "~/helpers/analytics"
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
  const settingsContext = useContext(SettingsContext)
  const theme = settingsContext.isDark ? darkTheme : lightTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

function App() {
  return (
    <AnalyticsProvider>
      <ContextWrapper>
        <ThemeWrapper>
          {/* CSS Reset */}
          <CssBaseline />

          {/* Router */}
          <AppRouter />
        </ThemeWrapper>
      </ContextWrapper>
    </AnalyticsProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

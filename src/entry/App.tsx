import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import React, { ReactNode, useContext } from "react"
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
import { AppRouter } from "~/routes/router"
import indigo from "@material-ui/core/colors/indigo"
import red from "@material-ui/core/colors/red"

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: red[400],
    },
  },
})

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

import React, { ReactNode } from "react"
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import {
  AuthContextProvider,
  BackupContextProvider,
  EditorStateContextProvider,
  BookmarkContextProvider,
  ViewContextProvider,
  LayoutContextProvider,
  SettingsContextProvider,
} from "~/context"
import { AppRouter } from "~/routes/router"
import { createRoot } from "react-dom/client"

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

function App() {
  return (
    <ContextWrapper>
      {/* CSS Reset */}
      <CssBaseline />

      {/* Router */}
      <AppRouter />
    </ContextWrapper>
  )
}

const rootEl = document.getElementById("root")
const root = createRoot(rootEl!)
root.render(<App />)

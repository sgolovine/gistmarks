import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import React, { ReactNode } from "react"
import { LayoutContextProvider } from "~/context/LayoutContext"
import {
  AuthContextProvider,
  BackupContextProvider,
  EditorStateContextProvider,
  BookmarkContextProvider,
  GlobalStateContextProvider,
  ViewContextProvider,
} from "~/context"
import { AppRouter } from "~/routes/router"

interface ContextWrapperProps {
  children: ReactNode
}

// Contexts used by the app
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return (
    <GlobalStateContextProvider>
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
    </GlobalStateContextProvider>
  )
}

export default function App() {
  return (
    <ContextWrapper>
      {/* CSS Reset */}
      <CssBaseline />

      {/* Router */}
      <AppRouter />
    </ContextWrapper>
  )
}

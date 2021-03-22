import React, { ReactNode } from "react"
import {
  AuthContextProvider,
  BackupContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
  BookmarkContextProvider,
  GlobalStateContextProvider,
  ViewContextProvider,
} from "~/context"

import "~/styles/tailwind.css"
import "~/styles/button.css"
import "~/styles/form.css"
import { Router } from "~/routes"

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

const App = () => {
  return (
    <ContextWrapper>
      <Router />
    </ContextWrapper>
  )
}

export default App

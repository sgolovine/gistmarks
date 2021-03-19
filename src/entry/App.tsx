import React, { ReactNode } from "react"
import {
  AuthContextProvider,
  BackupContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
  BookmarkContextProvider,
  LogicProvider,
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
    <AuthContextProvider>
      <LayoutContextProvider>
        <BookmarkContextProvider>
          <EditorStateContextProvider>
            <BackupContextProvider>{children}</BackupContextProvider>
          </EditorStateContextProvider>
        </BookmarkContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
  )
}

const App = () => {
  return (
    <ContextWrapper>
      <LogicProvider>
        <Router />
      </LogicProvider>
    </ContextWrapper>
  )
}

export default App

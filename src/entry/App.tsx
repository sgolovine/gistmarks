import React, { ReactNode } from "react"
import {
  AuthContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
} from "~/context"

import "~/styles/tailwind.css"
import "~/styles/button.css"
import "~/styles/form.css"
import { BookmarkContextProvider } from "~/context/BookmarkContext"
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
          <EditorStateContextProvider>{children}</EditorStateContextProvider>
        </BookmarkContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
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

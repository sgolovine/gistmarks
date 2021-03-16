import React, { ReactNode } from "react"
import { BookmarkList } from "~/components/bookmark"
import Layout from "~/components/Layout"
import {
  AuthContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
} from "~/context"

import "~/styles/tailwind.css"
import "~/styles/button.css"
import "~/styles/form.css"
import { BookmarkContextProvider } from "~/context/BookmarkContext"

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
      <Layout>
        <BookmarkList />
      </Layout>
    </ContextWrapper>
  )
}

export default App

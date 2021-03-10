import React, { ReactNode } from "react"
import { BookmarkList } from "~/components/bookmark"
import Layout from "~/components/Layout"
import {
  AuthContextProvider,
  CollectionsContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
} from "~/context"

import "~/styles/tailwind.css"
import "~/styles/button.css"

interface ContextWrapperProps {
  children: ReactNode
}

const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <LayoutContextProvider>
        <CollectionsContextProvider>
          <EditorStateContextProvider>{children}</EditorStateContextProvider>
        </CollectionsContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
  )
}

const App = () => {
  // return <h1>App.js</h1>
  return (
    <ContextWrapper>
      <Layout>
        <BookmarkList />
      </Layout>
    </ContextWrapper>
  )
}

export default App

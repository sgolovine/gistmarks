import React, { ReactNode } from "react"
import { BookmarkList } from "~/components/bookmark"
import Layout from "~/components/Layout"
import {
  AuthContextProvider,
  CollectionsContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
} from "~/context"
import DebugWindow from "~/components/DebugWindow"

import "~/styles/tailwind.css"
import "~/styles/button.css"
import "~/styles/form.css"
import { NewCollectionsContextProvider } from "~/context/NewCollectionsContext"

interface ContextWrapperProps {
  children: ReactNode
}

// Contexts used by the app
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <LayoutContextProvider>
        <CollectionsContextProvider>
          <NewCollectionsContextProvider>
            <EditorStateContextProvider>{children}</EditorStateContextProvider>
          </NewCollectionsContextProvider>
        </CollectionsContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
  )
}

// Modals used by the app
const AppModals = () => {
  return (
    <>
      <DebugWindow />
    </>
  )
}

const App = () => {
  return (
    <ContextWrapper>
      <Layout>
        <BookmarkList />
      </Layout>
      <AppModals />
    </ContextWrapper>
  )
}

export default App

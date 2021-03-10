import React, { ReactNode } from "react"
import { BookmarkList } from "~/components/bookmark"
import Layout from "~/components/Layout"
import { Provider } from "react-redux"
import {
  AuthContextProvider,
  CollectionsContextProvider,
  EditorStateContextProvider,
  LayoutContextProvider,
} from "~/context"
import { store } from "~/redux"

import "~/styles/tailwind.css"
import "~/styles/button.css"
import DebugWindow from "~/components/DebugWindow"

interface ContextWrapperProps {
  children: ReactNode
}

// Contexts used by the app
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
      <Provider store={store}>
        <Layout>
          <BookmarkList />
        </Layout>
        <AppModals />
      </Provider>
    </ContextWrapper>
  )
}

export default App

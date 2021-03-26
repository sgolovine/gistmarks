import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import React, { ReactNode } from "react"
import { CreatePanel, EditPanel } from "~/components/BookmarkPanel"
import { SettingsPanel } from "~/components/SettingsPanel"
import { LayoutContextProvider } from "~/context/LayoutContext"
import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import { BookmarkList } from "../layout/BookmarkList"

import {
  AuthContextProvider,
  BackupContextProvider,
  EditorStateContextProvider,
  BookmarkContextProvider,
  GlobalStateContextProvider,
  ViewContextProvider,
} from "~/context"

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

      {/* App Header */}
      <Header />

      {/* App Sidebar */}
      <Sidebar />

      {/* Create / Edit Bookmark Panel */}
      <CreatePanel />
      <EditPanel />

      {/* Settings Panel */}
      <SettingsPanel />

      {/* Bookmark List */}
      <BookmarkList />
    </ContextWrapper>
  )
}

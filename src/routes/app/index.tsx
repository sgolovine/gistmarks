import React from "react"
import { CreatePanel, EditPanel } from "~/components/BookmarkPanel"
import { SettingsPanel } from "~/components/SettingsPanel"
import { BookmarkList } from "~/components/BookmarkList"
import Header from "~/layout/Header"
import Sidebar from "~/layout/Sidebar"

export const AppRoute = () => {
  return (
    <>
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
      <BookmarkList view={false} />
    </>
  )
}

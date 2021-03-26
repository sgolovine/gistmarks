import React, { useContext } from "react"
import { CreatePanel, EditPanel } from "~/components/BookmarkPanel"
import { SettingsPanel } from "~/components/SettingsPanel"
import { BookmarkContext } from "~/context"
import { BookmarkList } from "~/layout/BookmarkList"
import Header from "~/layout/Header"
import Sidebar from "~/layout/Sidebar"

export const AppRoute = () => {
  const bookmarkContext = useContext(BookmarkContext)

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
      <BookmarkList bookmarks={bookmarkContext.bookmarks} readonly={false} />
    </>
  )
}

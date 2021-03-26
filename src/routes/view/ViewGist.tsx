import React, { useContext } from "react"
import { ViewContext } from "~/context"
import { BookmarkList } from "~/layout/BookmarkList"
import Header from "~/layout/Header"
import Sidebar from "~/layout/Sidebar"

export const ViewGistRoute = () => {
  const viewContext = useContext(ViewContext)
  return (
    <>
      {/* App Header */}
      <Header noSettings noEditor />

      {/* App Sidebar */}
      <Sidebar />

      {/* Bookmark List */}
      <BookmarkList bookmarks={viewContext.bookmarks} readonly={true} />
    </>
  )
}

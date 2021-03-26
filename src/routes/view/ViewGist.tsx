import React from "react"
import { BookmarkList } from "~/layout/BookmarkList"
import Header from "~/layout/Header"
import Sidebar from "~/layout/Sidebar"

export const ViewGistRoute = () => {
  return (
    <>
      {/* App Header */}
      <Header noSettings noEditor />

      {/* App Sidebar */}
      <Sidebar />

      {/* Bookmark List */}
      <BookmarkList />
    </>
  )
}

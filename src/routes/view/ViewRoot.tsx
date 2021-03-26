import React from "react"
import Header from "~/layout/Header"
import Sidebar from "~/layout/Sidebar"

export const ViewRootRoute = () => {
  return (
    <>
      {/* App Header */}
      <Header noSidebar noSettings noEditor noSearch />

      {/* App Sidebar */}
      <Sidebar />
    </>
  )
}

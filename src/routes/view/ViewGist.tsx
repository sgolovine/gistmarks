import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ViewContext } from "~/context"
import { BookmarkList } from "~/components/BookmarkList"
import Header from "~/layout/Header"
import Sidebar from "~/layout/Sidebar"
import { SettingsPanel } from "~/components/SettingsPanel"

interface RouteParams {
  id: string
}

export const ViewGistRoute = () => {
  const params = useParams<RouteParams>()
  const viewContext = useContext(ViewContext)

  useEffect(() => {
    // Check and make sure that we have an ID
    if (!params || !params.id) {
      viewContext.setError({
        show: true,
        title: "Missing GistID",
        message: "Gist ID not found. Unable to load bookmarks",
      })
      // If we have an ID, hand off the ID to
      // context to then fetch the gist
    } else {
      viewContext.setGistId(params.id)
    }
  }, [])

  return (
    <>
      {/* App Header */}
      <Header route="view" />

      {/* App Sidebar */}
      <Sidebar view={true} />

      {/* Bookmark List */}
      <BookmarkList view={true} />

      {/* Settings Panel */}
      <SettingsPanel route="view" />
    </>
  )
}

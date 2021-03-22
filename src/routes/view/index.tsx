import React, { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { ErrorModal } from "~/components/common/ErrorModal"
import { ViewContext } from "~/context/ViewContext"
import { Layout } from "./Layout"

interface RouteParams {
  id: string
}

export const ViewRoute = () => {
  const params = useParams<RouteParams>()
  const viewContext = useContext(ViewContext)

  useEffect(() => {
    // Check and make sure that we have an ID
    if (!params || !params.id) {
      viewContext.setError({
        show: true,
        title: "Missing GistID",
        msg: "Gist ID not found. Unable to load bookmarks",
      })
      // If we have an ID, hand off the ID to
      // context to then fetch the gist
    } else {
      console.log("~~ fetching gist ~~")
      viewContext.setGistId(params.id)
    }
  }, [])

  return (
    <>
      <Layout>
        <p>View stub</p>
      </Layout>
      <ErrorModal
        open={viewContext.showError}
        title={viewContext.errorTitle}
        message={viewContext.errorMessage}
      />
    </>
  )
}

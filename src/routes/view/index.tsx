import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { BookmarkList } from "~/components/bookmark"
import { ErrorModal } from "~/components/common/ErrorModal"
import { ViewContext } from "~/context/ViewContext"
import { Layout } from "./Layout"

interface RouteParams {
  id: string
}

export const ViewRootRoute = () => {
  const [id, setId] = useState<string>("")
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl">View a Gistmark Collection</h1>
      <p>Enter a GistID to view a collection</p>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="form-field my-2"
        placeholder="Enter GistID"
      />
      {id && (
        <Link className="text-blue-600 hover:underline" to={`/view/${id}`}>
          View Collection
        </Link>
      )}
    </div>
  )
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
        <BookmarkList readonly bookmarks={viewContext.bookmarks} />
      </Layout>
      <ErrorModal
        open={viewContext.showError}
        title={viewContext.errorTitle}
        message={viewContext.errorMessage}
      />
    </>
  )
}

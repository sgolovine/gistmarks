import React, { useContext } from "react"
import { BookmarkList } from "~/components/bookmark"
import { BookmarkContext } from "~/context"
import { Layout } from "./Layout"

export const AppRoute: React.FC = () => {
  const bookmarkContext = useContext(BookmarkContext)

  return (
    <Layout>
      <BookmarkList bookmarks={bookmarkContext.bookmarks} />
    </Layout>
  )
}

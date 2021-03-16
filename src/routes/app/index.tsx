import React from "react"
import { BookmarkList } from "~/components/bookmark"
import { Layout } from "./Layout"

export const AppRoute: React.FC = () => {
  return (
    <Layout>
      <BookmarkList />
    </Layout>
  )
}

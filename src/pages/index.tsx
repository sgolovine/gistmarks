import React from "react"
import { Bookmark, BookmarkList } from "~/components/bookmark"
// import Bookmark from "~/components/Bookmark"
import Layout from "~/components/Layout"

type BookmarkListProps = {
  // TODO: Fix type
  data: any[]
}

// const BookmarkList: React.FC<BookmarkListProps> = ({ data }) => {
//   return (
//     <div className="max-w-3xl mx-auto">
//       {data.map((item, index) => {
//         return <Bookmark />
//       })}
//     </div>
//   )
// }

const Index = () => {
  const arr = new Array(100).fill(1)
  return (
    <Layout>
      {/* <BookmarkList data={arr} /> */}
      <Bookmark />
    </Layout>
  )
}

export default Index

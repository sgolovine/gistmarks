import React from "react"
import Bookmark from "~/components/Bookmark"
import Layout from "~/components/Layout"

const BookmarkTestStub = () => {
  const arr = new Array(100).fill(1)
  console.log(arr)
  return (
    <>
      {arr.map((_item: any, index: number) => {
        return <Bookmark key={index} />
      })}
    </>
  )
}
const Index = () => {
  return (
    <Layout>
      <BookmarkTestStub />
    </Layout>
  )
}

export default Index

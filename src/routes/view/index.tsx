import React, { useEffect } from "react"
import { useParams } from "react-router"
import { Layout } from "./Layout"

export const ViewRoute = () => {
  const params = useParams()

  useEffect(() => {
    console.log(params)
  }, [])

  return (
    <Layout>
      <p>View stub</p>
    </Layout>
  )
}

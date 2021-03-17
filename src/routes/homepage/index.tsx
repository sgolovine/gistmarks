import React from "react"
import { Link } from "react-router-dom"

export const HomepageRoute = () => {
  return (
    <div>
      <p>Homepage Stub</p>
      <div className="py-4 flex flex-col">
        <Link className="text-lg font-bold hover:text-blue-700" to="/app">
          Link to App
        </Link>
        <Link className="text-lg font-bold hover:text-blue-700" to="/view">
          Link to View
        </Link>
        <Link className="text-lg font-bold hover:text-blue-700" to="/add">
          Link to Add
        </Link>
      </div>
    </div>
  )
}

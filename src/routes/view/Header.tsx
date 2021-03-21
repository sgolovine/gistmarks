import React, { useContext } from "react"
import Media from "react-media"

import MenuIcon from "~/components/icons/MenuIcon"
import { BookmarkContext, LayoutContext } from "~/context"
import { GLOBAL_MEDIA_QUERIES } from "~/defines/mediaQueries"

export const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)

  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <button
          className="h-10 w-10 p-2 mx-2 border rounded shadow"
          onClick={layoutContext.toggleSidebar}
        >
          <MenuIcon />
        </button>
        <Media
          query={GLOBAL_MEDIA_QUERIES.lg}
          render={() => <p className="text-lg font-bold">GistMarks</p>}
        />

        <div>
          <input
            value={bookmarkContext.searchTerm}
            onChange={(e) => bookmarkContext.setSearch(e.target.value)}
            placeholder="Search"
            className="ml-2 py-2 px-1 border rounded"
          />
        </div>
      </div>
    </div>
  )
}

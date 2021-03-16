import React, { useContext } from "react"
import { BookmarkContext } from "~/context/BookmarkContext"
import { Bookmark } from "./Bookmark"

export const BookmarkList: React.FC = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const bookmarkKeys = Object.keys(bookmarkContext.bookmarks)

  if (bookmarkKeys.length === 0) {
    return <p>You don&apos;t have any bookmarks yet!</p>
  }

  return (
    <div className="flex flex-row flex-wrap">
      {bookmarkKeys.map((key) => {
        const bookmarkData = bookmarkContext.bookmarks[key]
        return (
          <Bookmark
            key={key}
            guid={key}
            title={bookmarkData.name}
            href={bookmarkData.href}
            description={bookmarkData.description}
          />
        )
      })}
    </div>
  )
}

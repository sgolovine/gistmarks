import React, { useContext } from "react"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { Bookmark } from "./Bookmark"

export const BookmarkList: React.FC = () => {
  const collectionContext = useContext(NewCollectionsContext)
  const bookmarkKeys = Object.keys(collectionContext.activeBookmarks)

  if (bookmarkKeys.length === 0) {
    return <p>You don't have any bookmarks yet!</p>
  }

  return (
    <div className="flex flex-row flex-wrap">
      {bookmarkKeys.map((key) => {
        const bookmarkData = collectionContext.activeBookmarks[key]
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

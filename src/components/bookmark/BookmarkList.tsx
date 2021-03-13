import React, { useContext } from "react"
import { CollectionsContext } from "~/context"
import { Bookmark } from "./Bookmark"

export const BookmarkList: React.FC = () => {
  const collectionContext = useContext(CollectionsContext)
  const bookmarkKeys = Object.keys(collectionContext.activeBookmarks)

  if (bookmarkKeys.length === 0) {
    return <p>You don&apos;t have any bookmarks yet!</p>
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

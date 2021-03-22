import React from "react"
import { BookmarkCollection } from "~/model/Bookmark"
import { Bookmark } from "./Bookmark"

interface Props {
  bookmarks: BookmarkCollection
  readonly?: boolean
}

export const BookmarkList: React.FC<Props> = ({
  bookmarks,
  readonly = false,
}) => {
  const bookmarkKeys = Object.keys(bookmarks)

  if (bookmarkKeys.length === 0) {
    return <p>You don&apos;t have any bookmarks yet!</p>
  }

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap">
      {bookmarkKeys.map((key) => {
        const bookmarkData = bookmarks[key]
        return (
          <Bookmark
            key={key}
            guid={key}
            title={bookmarkData.name}
            href={bookmarkData.href}
            description={bookmarkData.description}
            category={bookmarkData.category}
            readonly={readonly}
          />
        )
      })}
    </div>
  )
}

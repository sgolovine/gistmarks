import React, { useContext } from "react"
import { ViewContext } from "~/context"
import { BookmarkCard } from "~/components/BookmarkCard"
import { useStyles } from "./styles"

export const ViewList: React.FC = () => {
  const viewContext = useContext(ViewContext)
  const classes = useStyles()

  const bookmarkKeys = Object.keys(viewContext.bookmarks)

  return (
    <div className={classes.root}>
      {bookmarkKeys.map((key) => {
        const bookmarkData = viewContext.bookmarks[key]
        return (
          <BookmarkCard
            key={key}
            guid={key}
            name={bookmarkData.name}
            href={bookmarkData.href}
            description={bookmarkData.description}
            category={bookmarkData.category}
            readonly={true}
          />
        )
      })}
    </div>
  )
}

import React from "react"
import { BookmarkCollection } from "~/model/Bookmark"
import { BookmarkCard } from "../BookmarkCard"
import { ListEmpty } from "./ListEmpty"
import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

interface Props {
  bookmarks?: BookmarkCollection
  view?: boolean
  onEdit?: (bookmarkGuid: string) => void
  onDelete?: (bookmarkGuid: string) => void
}

export const List: React.FC<Props> = ({
  bookmarks = {},
  view = false,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles()

  const bookmarkKeys = Object.keys(bookmarks)

  if (bookmarkKeys.length === 0) {
    return (
      <div className={classes.root}>
        <ListEmpty />
      </div>
    )
  }

  const handleEdit = (guid: string) => !!onEdit && onEdit(guid)

  const handleDelete = (guid: string) => !!onDelete && onDelete(guid)

  return (
    <div className={classes.root}>
      {bookmarkKeys.map((key) => {
        const bookmarkData = bookmarks[key]
        return (
          <BookmarkCard
            key={key}
            guid={key}
            name={bookmarkData.name}
            href={bookmarkData.href}
            description={bookmarkData.description}
            category={bookmarkData.category}
            readonly={view}
            onEdit={() => handleEdit(key)}
            onDelete={() => handleDelete(key)}
          />
        )
      })}
    </div>
  )
}

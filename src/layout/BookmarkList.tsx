import { makeStyles } from "@material-ui/core"
import React, { useContext } from "react"
import { BookmarkCard } from "~/components/BookmarkCard"
import { EditorStateContext, LayoutContext } from "~/context"
import { BookmarkCollection } from "~/model/Bookmark"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

interface Props {
  bookmarks: BookmarkCollection
  readonly?: boolean
}

export const BookmarkList: React.FC<Props> = ({ bookmarks, readonly }) => {
  const editorStateContext = useContext(EditorStateContext)
  const layoutContext = useContext(LayoutContext)
  const classes = useStyles()
  const bookmarkKeys = Object.keys(bookmarks)

  const handleEditBookmark = (bookmarkGuid: string) => {
    const bookmark = bookmarks[bookmarkGuid]
    if (bookmark) {
      editorStateContext.setAllFields({
        guid: bookmarkGuid,
        name: bookmark.name,
        href: bookmark.href,
        description: bookmark.description,
        category: bookmark.category,
      })
      layoutContext.openEditPanel()
    }
  }

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
            readonly={readonly}
            onEdit={handleEditBookmark}
          />
        )
      })}
    </div>
  )
}

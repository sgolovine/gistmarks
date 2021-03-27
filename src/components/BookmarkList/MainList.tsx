import React, { useContext } from "react"
import { EditorStateContext, BookmarkContext, LayoutContext } from "~/context"
import { BookmarkCard } from "~/components/BookmarkCard"
import { useStyles } from "./styles"
import { ListEmpty } from "./ListEmpty"

interface Props {
  readonly?: boolean
}

export const MainList: React.FC<Props> = ({ readonly }) => {
  const classes = useStyles()
  const editorStateContext = useContext(EditorStateContext)
  const bookmarkContext = useContext(BookmarkContext)
  const layoutContext = useContext(LayoutContext)

  const bookmarkKeys = Object.keys(bookmarkContext.bookmarks)

  const handleEditBookmark = (bookmarkGuid: string) => {
    const bookmark = bookmarkContext.bookmarks[bookmarkGuid]
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

  const handleDeleteBookmark = (guid: string) => {
    bookmarkContext.removeBookmark(guid)
  }

  if (bookmarkKeys.length === 0) {
    return (
      <div className={classes.root}>
        <ListEmpty />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {bookmarkKeys.map((key) => {
        const bookmarkData = bookmarkContext.bookmarks[key]
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
            onDelete={handleDeleteBookmark}
          />
        )
      })}
    </div>
  )
}

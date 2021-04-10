import React, { useContext } from "react"
import {
  BookmarkContext,
  EditorStateContext,
  LayoutContext,
  ViewContext,
} from "~/context"
import { LoadingIndicator } from "../common/LoadingIndicator"
import { List } from "./List"

interface Props {
  view: boolean
}

export const BookmarkList: React.FC<Props> = ({ view }) => {
  const viewContext = useContext(ViewContext)
  const bookmarkContext = useContext(BookmarkContext)
  const editorStateContext = useContext(EditorStateContext)
  const layoutContext = useContext(LayoutContext)

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

  const handleDeleteBookmark = (bookmarkGuid: string) => {
    bookmarkContext.removeBookmark(bookmarkGuid)
  }

  const bookmarks = view ? viewContext.bookmarks : bookmarkContext.bookmarks
  const totalBookmarkCount = view
    ? Object.keys(viewContext.bookmarks).length
    : Object.keys(bookmarkContext.allBookmarks).length

  // Loading only happens when you view a gist.
  // only display loading if we are on the view page
  // AND we are loading bookmarks
  const isLoading = view && viewContext.gistLoading

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <List
      bookmarks={bookmarks}
      onEdit={handleEditBookmark}
      onDelete={handleDeleteBookmark}
      view={view}
      totalBookmarkCount={totalBookmarkCount}
    />
  )
}

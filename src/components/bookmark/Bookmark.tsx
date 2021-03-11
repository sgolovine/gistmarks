import React, { useContext } from "react"
import { BookmarkContext, EditorStateContext, LayoutContext } from "~/context"
import EditIcon from "../icons/EditIcon"
import TrashIcon from "../icons/TrashIcon"

interface Props {
  guid: string
  title?: string
  href?: string
  description?: string
}

const CARD_SIZE = "72"

export const Bookmark: React.FC<Props> = ({
  guid,
  title,
  href,
  description,
}) => {
  const editorStateContext = useContext(EditorStateContext)
  const bookmarkContext = useContext(BookmarkContext)
  const layoutContext = useContext(LayoutContext)

  const handleEdit = () => {
    const bookmark = bookmarkContext.data.bookmarks[guid]
    if (bookmark) {
      editorStateContext.bookmark.setFields({
        guid,
        name: bookmark.name,
        href: bookmark.href,
        description: bookmark.description,
        category: bookmark.category,
      })
      layoutContext.toggleEditPanel()
    }
  }

  const handleDelete = () => {
    bookmarkContext.actions.removeBookmark(guid)
  }

  return (
    <div
      className={`border h-${CARD_SIZE} w-${CARD_SIZE} m-2 p-2 rounded hover:shadow`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col">
          <a
            className="text-lg font-bold hover:text-blue-700 truncate"
            href={href}
          >
            {title}
          </a>
          <a
            className="text-sm font-italic text-gray-700 hover:text-blue-700 truncate"
            href={href}
          >
            {href}
          </a>
          <div className="pt-4">
            <p>{description}</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button
            className="border shadow rounded p-1 mr-2"
            onClick={handleEdit}
          >
            <div className="h-6 w-6">
              <EditIcon />
            </div>
          </button>
          <button
            className="border shadow rounded p-1 ml-2"
            onClick={handleDelete}
          >
            <div className="h-6 w-6">
              <TrashIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

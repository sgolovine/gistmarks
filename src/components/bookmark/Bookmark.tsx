import React, { useContext } from "react"
import { EditorStateContext, LayoutContext } from "~/context"
import { BookmarkContext } from "~/context/BookmarkContext"
import EditIcon from "../icons/EditIcon"
import TrashIcon from "../icons/TrashIcon"

interface Props {
  guid: string
  title?: string
  href?: string
  description?: string
  category?: string
}

const CARD_SIZE = "72"

export const Bookmark: React.FC<Props> = ({
  guid,
  title,
  href,
  description,
  category,
}) => {
  const editorStateContext = useContext(EditorStateContext)
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)

  const handleEdit = () => {
    const bookmark = bookmarkContext.bookmarks[guid]
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
    bookmarkContext.removeBookmark(guid)
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
          {category && (
            <div className="flex flex-row pt-2">
              <p className="border m-1 px-2 py-1 rounded-full text-sm font-bold bg-blue-500 text-white">
                {category}
              </p>
            </div>
          )}
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

import React, { useContext, useState } from "react"
import Media from "react-media"
import { EditorStateContext, LayoutContext } from "~/context"
import { BookmarkContext } from "~/context/BookmarkContext"
import { GLOBAL_MEDIA_QUERIES } from "~/defines/mediaQueries"
import EditIcon from "../icons/EditIcon"
import TrashIcon from "../icons/TrashIcon"

interface Props {
  guid: string
  title?: string
  href?: string
  description?: string
  category?: string
  readonly?: boolean
}

export const Bookmark: React.FC<Props> = ({
  guid,
  title,
  href,
  description,
  category,
  readonly,
}) => {
  const editorStateContext = useContext(EditorStateContext)
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)

  const [isHovering, setIsHovering] = useState(false)

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

  const renderMobileHref = () => {
    if (isHovering) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-blue-700 mx-2 lg:mx-0 truncate"
        >
          {href}
        </a>
      )
    } else {
      return null
    }
  }

  const renderDesktopHref = () => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-600 hover:text-blue-700 mx-2 lg:mx-0 truncate"
    >
      {href}
    </a>
  )

  return (
    <div
      className={`border lg:h-72 lg:w-72 m-2 p-2 rounded hover:shadow flex flex-row lg:flex-col justify-between lg:justify-start`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header */}
      <div className="flex flex-grow lg:flex-grow-0 flex-row lg:flex-col items-center lg:items-start overflow-hidden">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold hover:text-blue-700 truncate max-w-xs"
        >
          {title}
        </a>
        <Media
          query={GLOBAL_MEDIA_QUERIES.mobileLayout}
          render={() => renderMobileHref()}
        />
        <Media
          query={GLOBAL_MEDIA_QUERIES.lg}
          render={() => renderDesktopHref()}
        />
      </div>
      {/* Category */}
      {category && (
        <div className="flex flex-row lg:pt-2">
          <p className="border m-1 px-2 py-1 rounded-full text-sm font-bold bg-blue-500 text-white mx-2 lg:mx-0">
            {category}
          </p>
        </div>
      )}

      {description && (
        <Media
          query={GLOBAL_MEDIA_QUERIES.lg}
          render={() => (
            <div className="lg:flex-grow lg:py-2">
              <p>{description}</p>
            </div>
          )}
        />
      )}

      {/* Action Buttons */}
      {!readonly && (
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
      )}
    </div>
  )
}

import React, { useState } from "react"
import IconButton from "./common/IconButton"
import EditIcon from "./icons/EditIcon"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"
import TrashIcon from "./icons/TrashIcon"

const Bookmark: React.FC = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <div
      className="h-64 w-64 border m-2 p-2 rounded shadow flex flex-col justify-between"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div>
        <div>
          <div className="flex flex-row items-center">
            <p className="text-lg font-bold leading-loose hover:text-blue-700">
              Bookmark Title
            </p>
            <div className="h-4 w-4">
              <ExternalLinkIcon fill="blue" />
            </div>
          </div>
          <p className="text-xs text-gray-700 hover:text-blue-700 truncate">
            https://bookmark-href.com/something/else
          </p>
        </div>
        <p className="text-sm mt-4">
          Bookmark Description, This is a short description of what the bookmark
          does
        </p>
      </div>
      {isHovering && (
        <div className="flex flex-row">
          <IconButton>
            <TrashIcon fill="#666" />
          </IconButton>
          <IconButton>
            <EditIcon fill="#666" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
export default Bookmark

import React from "react"
import IconButton from "./common/IconButton"
import EditIcon from "./icons/EditIcon"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"
import TrashIcon from "./icons/TrashIcon"

const Bookmark: React.FC = () => {
  return (
    <div className="h-64 w-64 border m-2 p-2 rounded shadow flex flex-col justify-between">
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
      <div className="flex flex-row">
        <IconButton bgClassName="bg-red-600">
          <TrashIcon fill="white" />
        </IconButton>
        <IconButton bgClassName="bg-blue-600">
          <EditIcon fill="white" />
        </IconButton>
      </div>
    </div>
  )
}
export default Bookmark

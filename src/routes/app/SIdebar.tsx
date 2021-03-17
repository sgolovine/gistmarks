import React, { useContext } from "react"
import CloseIcon from "~/components/icons/CloseIcon"
import { BookmarkContext } from "~/context"

export const Sidebar: React.FC = () => {
  const bookmarkContext = useContext(BookmarkContext)

  return (
    <div className="flex flex-col min-w-sidebar p-4 h-full">
      <div>
        <p className="font-bold pb-2">Active Categories</p>
        <div className="flex flex-row">
          {bookmarkContext.activeCategories.length > 0 &&
            bookmarkContext.activeCategories.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border  flex flex-row rounded-full px-2 py-1 items-center"
                >
                  <p className="text-sm font-bold self-center">{item}</p>
                  <button
                    className="ml-1"
                    onClick={() => bookmarkContext.removeActiveCategory(item)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              )
            })}
        </div>
        <p className="font-bold py-2">Categories</p>
        <div className="flex flex-col items-start">
          {bookmarkContext.categories.map((category, index) => {
            return (
              <button
                className="my-2"
                key={index}
                value={category}
                onClick={() => bookmarkContext.addActiveCategory(category)}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

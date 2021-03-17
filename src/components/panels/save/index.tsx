import React, { useContext, useState } from "react"
import Button from "~/components/common/Button"
import { BookmarkContext } from "~/context"
import { downloadFile } from "~/helpers"

export const SavePanel = () => {
  const bookmarkContext = useContext(BookmarkContext)

  const handleBackupToJSON = () => {
    const bookmarksJsonData = JSON.stringify(bookmarkContext.bookmarks, null, 2)
    downloadFile(bookmarksJsonData, "bookmarks.json")
  }

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        const content = fileReader.result
        if (content) {
          bookmarkContext.restoreBookmarks(content as string)
        } else {
          alert("Could not load bookmarks, no data found")
        }
      }
      fileReader.readAsText(file)
    }
  }

  return (
    <div className="min-w-create-panel border p-1">
      <p className="font-bold text-2xl">Backup and Sync</p>
      <div className="py-2">
        <p className="font-bold text-lg">Backup to JSON File</p>
        <Button
          additionalClassnames="m-2"
          label="Download JSON File"
          onClick={handleBackupToJSON}
        />
      </div>
      <div className="py-2">
        <p className="font-bold text-lg">Restore from JSON File</p>
        <p className="max-w-sm">
          Note: if you have unsaved bookmarks, they will be overwritten when
          restoring from a JSON file
        </p>
        <input
          className="py-2"
          type="file"
          onChange={(e) => handleSelectFile(e)}
        />
      </div>
    </div>
  )
}

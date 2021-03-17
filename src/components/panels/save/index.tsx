import React, { useContext, useEffect, useState } from "react"
import Button from "~/components/common/Button"
import { GithubAuthButton } from "~/components/common/GithubAuthButton"
import { AuthContext, BookmarkContext } from "~/context"
import { downloadFile } from "~/helpers"

export const SavePanel = () => {
  const authContext = useContext(AuthContext)
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

  const [filenameValue, setFilenameValue] = useState<string>("bookmarks.json")
  const [descriptionValue, setDescriptionValue] = useState<string>("")
  const [gistIdValue, setGistIdValue] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  useEffect(() => {
    console.log("Debug > ", gistIdValue, isUpdating)
    if (gistIdValue) {
      setIsUpdating(true)
    } else {
      setIsUpdating(false)
    }
  }, [gistIdValue])

  return (
    <div className="min-w-create-panel border p-1">
      <div>
        <p className="font-bold text-2xl">Backup and Sync</p>
        <div className="py-4">
          <p className="font-bold text-lg">Backup to JSON File</p>
          <Button
            additionalClassnames="m-2"
            label="Download JSON File"
            onClick={handleBackupToJSON}
          />
        </div>
        <div className="py-4">
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
        <div className="py-4">
          <p className="font-bold text-lg">Backup to Github Gist</p>
          {authContext.isLoggedIn ? (
            <>
              <div className="form-container">
                <label className="form-label">Filename</label>
                <input
                  className="form-field"
                  value={filenameValue}
                  onChange={(e) => setFilenameValue(e.target.value)}
                />
              </div>

              <div className="form-container">
                <label className="form-label">Description (optional)</label>
                <input
                  className="form-field"
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                />
              </div>

              <div className="form-container">
                <label className="form-label">Gist ID (optional)</label>
                <p className="text-sm">
                  If you want to update an existing backup, enter a gist id
                </p>
                <input
                  className="form-field"
                  value={gistIdValue}
                  onChange={(e) => setGistIdValue(e.target.value)}
                />
              </div>

              <Button
                label={isUpdating ? "Update Existing Gist" : "Create new Gist"}
              />
            </>
          ) : (
            <GithubAuthButton />
          )}
        </div>
        <div className="py-4">
          <p className="font-bold text-lg">Restore from Github Gist</p>
          <div className="form-container">
            <label className="form-label">Filename</label>
            <p className="text-sm">
              If you assigned a different filename to your gist when you saved
              it. Enter the custom filename so gistmarks can restore it
              properly.
            </p>
            <input
              className="form-field"
              value={filenameValue}
              onChange={(e) => setFilenameValue(e.target.value)}
            />
          </div>
          <div className="form-container">
            <label className="form-label">Gist ID</label>
            <input
              className="form-field"
              value={filenameValue}
              onChange={(e) => setFilenameValue(e.target.value)}
            />
          </div>
          <Button label="Restore Collection" />
        </div>
        {authContext.isLoggedIn && (
          <div className="pt-32">
            <Button label="Logout" onClick={() => authContext.logout()} />
          </div>
        )}
      </div>
    </div>
  )
}

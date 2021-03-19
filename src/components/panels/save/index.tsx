import React, { useContext } from "react"
import Button from "~/components/common/Button"
import { AuthContext, BackupContext, BookmarkContext } from "~/context"
import { downloadFile } from "~/helpers"
import { GistBackup } from "./GistBackup"
import { GistRestore } from "./GistRestore"
import { LocalBackup } from "./LocalBackup"
import { LocalRestore } from "./LocalRestore"

export const SavePanel = () => {
  const authContext = useContext(AuthContext)
  const bookmarkContext = useContext(BookmarkContext)
  const backupContext = useContext(BackupContext)

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

  // const handleGistRestore = () => {}

  return (
    <div className="min-w-create-panel border p-1">
      <div>
        <p className="font-bold text-2xl">Backup and Sync</p>
        {/* BACKUP TO JSON */}
        <LocalBackup handleBackup={handleBackupToJSON} />

        {/* RESTORE FROM JSON */}
        <LocalRestore onSelectFile={handleSelectFile} />

        {/* BACKUP TO GITHUB GIST */}
        <GistBackup
          filenameValue={backupContext.gistBackup.filename}
          descriptionValue={backupContext.gistBackup.description}
          gistIdValue={backupContext.gistBackup.gistId}
          backupLoading={backupContext.gistBackup.backupLoading}
          htmlUrlValue={backupContext.backupResults.htmlUrl}
          backupCreated={backupContext.backupResults.backupCreated}
          onSubmit={
            backupContext.gistBackup.gistId
              ? backupContext.actions.updateBackup
              : backupContext.actions.createBackup
          }
          onGistIdChange={(newValue: string) =>
            backupContext.gistBackup.setField("gistId", newValue)
          }
          onFilenameChange={(newValue: string) =>
            backupContext.gistBackup.setField("filename", newValue)
          }
          onDescriptionChange={(newValue: string) =>
            backupContext.gistBackup.setField("description", newValue)
          }
          autosaveEnabled={backupContext.options.autoSave}
          toggleAutosave={(newState: boolean) =>
            backupContext.options.setField("autoSave", newState)
          }
        />

        {/* RESTORE FROM GITHUB GIST */}
        <GistRestore
          filenameValue={backupContext.gistRestore.filename}
          gistIdValue={backupContext.gistRestore.gistId}
          onFilenameChange={(newValue: string) =>
            backupContext.gistRestore.setField("filename", newValue)
          }
          onGistIdChange={(newValue: string) =>
            backupContext.gistRestore.setField("gistId", newValue)
          }
        />

        {/* LOGOUT BUTTON */}
        {authContext.isLoggedIn && (
          <div className="pt-32">
            <Button label="Logout" onClick={() => authContext.logout()} />
          </div>
        )}
      </div>
    </div>
  )
}

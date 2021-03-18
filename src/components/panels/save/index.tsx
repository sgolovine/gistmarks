import React, { useContext, useState } from "react"
import Button from "~/components/common/Button"
import { AuthContext, BookmarkContext } from "~/context"
import { downloadFile } from "~/helpers"
import { GistBackup, GistBackupState } from "./GistBackup"
import { GistRestore, GistRestoreState } from "./GistRestore"
import { LocalBackup } from "./LocalBackup"
import { LocalRestore } from "./LocalRestore"

export const SavePanel = () => {
  const authContext = useContext(AuthContext)
  const bookmarkContext = useContext(BookmarkContext)

  const [gistRestoreState, setGistRestoreState] = useState<GistRestoreState>({
    filenameValue: "",
    gistIdValue: "",
  })

  const [gistBackupState, setGistBackupState] = useState<GistBackupState>({
    filenameValue: "",
    descriptionValue: "",
    gistIdValue: "",
  })

  const setBackupField = (key: keyof GistBackupState, newValue: string) => {
    setGistBackupState({
      ...gistBackupState,
      [key]: newValue,
    })
  }

  const setRestoreField = (key: keyof GistRestoreState, newValue: string) => {
    setGistRestoreState({
      ...gistRestoreState,
      [key]: newValue,
    })
  }

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
      <div>
        <p className="font-bold text-2xl">Backup and Sync</p>
        {/* BACKUP TO JSON */}
        <LocalBackup handleBackup={handleBackupToJSON} />

        {/* RESTORE FROM JSON */}
        <LocalRestore onSelectFile={handleSelectFile} />

        {/* BACKUP TO GITHUB GIST */}
        <GistBackup
          filenameValue={gistBackupState.filenameValue}
          descriptionValue={gistBackupState.descriptionValue}
          gistIdValue={gistBackupState.gistIdValue}
          onGistIdChange={(newValue: string) =>
            setBackupField("gistIdValue", newValue)
          }
          onFilenameChange={(newValue: string) =>
            setBackupField("filenameValue", newValue)
          }
          onDescriptionChange={(newValue: string) =>
            setBackupField("descriptionValue", newValue)
          }
        />

        {/* RESTORE FROM GITHUB GIST */}
        <GistRestore
          filenameValue={gistRestoreState.filenameValue}
          gistIdValue={gistRestoreState.gistIdValue}
          onFilenameChange={(newValue: string) =>
            setRestoreField("filenameValue", newValue)
          }
          onGistIdChange={(newValue: string) =>
            setRestoreField("gistIdValue", newValue)
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

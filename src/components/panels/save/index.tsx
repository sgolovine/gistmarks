import React, { useContext, useEffect } from "react"
import Button from "~/components/common/Button"
import { AuthContext, BookmarkContext } from "~/context"
import {
  GIST_BACKUP_RESULT_STATE,
  GIST_BACKUP_STATE,
  GIST_RESTORE_STATE,
} from "~/defines"
import { downloadFile } from "~/helpers"
import useLocalStorage from "~/hooks/useLocalStorage"
import { createGist } from "~/requests/createGist"
import { createInstance } from "~/requests/setup"
import { updateGist } from "~/requests/updateGist"
import {
  GistBackup,
  GistBackupResultState,
  GistBackupState,
} from "./GistBackup"
import { GistRestore, GistRestoreState } from "./GistRestore"
import { LocalBackup } from "./LocalBackup"
import { LocalRestore } from "./LocalRestore"

export const SavePanel = () => {
  const authContext = useContext(AuthContext)
  const bookmarkContext = useContext(BookmarkContext)

  const [
    gistRestoreState,
    setGistRestoreState,
  ] = useLocalStorage<GistRestoreState>(GIST_RESTORE_STATE, {
    filenameValue: "",
    gistIdValue: "",
  })

  const [
    gistBackupState,
    setGistBackupState,
  ] = useLocalStorage<GistBackupState>(GIST_BACKUP_STATE, {
    backupLoading: false,
    filenameValue: "bookmarks.json",
    descriptionValue: "",
    gistIdValue: "",
  })

  const [
    backupResultState,
    setBackupResultState,
  ] = useLocalStorage<GistBackupResultState>(GIST_BACKUP_RESULT_STATE, {
    gistId: "",
    description: "",
    htmlUrl: "",
    backupCreated: false,
  })

  useEffect(() => {
    if (backupResultState.gistId) {
      setBackupField("gistIdValue", backupResultState.gistId)
    }
  }, [backupResultState.gistId])

  const setBackupField = (
    key: keyof GistBackupState,
    newValue: string | boolean
  ) => {
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

  const handleGistCreateBackup = async () => {
    if (authContext.accessToken) {
      setBackupField("backupLoading", true)
      const instance = createInstance(authContext.accessToken)
      const resp = await createGist(
        instance,
        gistBackupState.filenameValue,
        gistBackupState.descriptionValue,
        bookmarkContext.bookmarks
      )
      if (resp && resp.status === 201) {
        setBackupField("backupLoading", false)
        const { html_url, id, description } = resp.data
        setBackupResultState({
          gistId: id,
          htmlUrl: html_url,
          description,
          backupCreated: true,
        })
      } else {
        setBackupField("backupLoading", false)
        // TODO: Handle Error
      }
    }
  }

  const handleGistUpdateBackup = async () => {
    if (authContext.accessToken && gistBackupState.gistIdValue) {
      setBackupField("backupLoading", true)
      const instance = createInstance(authContext.accessToken)
      const resp = await updateGist({
        instance,
        gistId: gistBackupState.gistIdValue,
        filename: gistBackupState.filenameValue,
        description: gistBackupState.descriptionValue,
        bookmarks: bookmarkContext.bookmarks,
      })
      if (resp && resp.status === 201) {
        setBackupField("backupLoading", false)
        const { html_url, id, description } = resp.data
        setBackupResultState({
          gistId: id,
          htmlUrl: html_url,
          description,
          backupCreated: true,
        })
      } else {
        setBackupField("backupLoading", false)
        // TODO: Handle Error
      }
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
          filenameValue={gistBackupState.filenameValue}
          descriptionValue={gistBackupState.descriptionValue}
          gistIdValue={gistBackupState.gistIdValue}
          backupLoading={gistBackupState.backupLoading}
          htmlUrlValue={backupResultState.htmlUrl}
          backupCreated={backupResultState.backupCreated}
          onSubmit={
            gistBackupState.gistIdValue
              ? handleGistUpdateBackup
              : handleGistCreateBackup
          }
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

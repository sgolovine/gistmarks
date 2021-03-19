import React, { useContext, useEffect, useState } from "react"
import Button from "~/components/common/Button"
import { GithubAuthButton } from "~/components/common/GithubAuthButton"
import ExternalLinkIcon from "~/components/icons/ExternalLinkIcon"
import { Loader } from "~/components/icons/Loader"
import { AuthContext } from "~/context"

interface Props {
  filenameValue: string
  descriptionValue: string
  gistIdValue: string
  htmlUrlValue?: string
  backupCreated: boolean
  backupLoading: boolean
  onGistIdChange: (newDesc: string) => void
  onDescriptionChange: (newDesc: string) => void
  onFilenameChange: (newFilename: string) => void
  onSubmit: () => void
}

export type GistBackupState = Pick<
  Props,
  "filenameValue" | "descriptionValue" | "gistIdValue"
> & {
  backupLoading: boolean
}

export interface GistBackupResultState {
  gistId: string
  description: string
  htmlUrl: string
  backupCreated: boolean
}

export const GistBackup: React.FC<Props> = ({
  filenameValue,
  descriptionValue,
  gistIdValue,
  onGistIdChange,
  onFilenameChange,
  onDescriptionChange,
  onSubmit,
  htmlUrlValue,
  backupCreated,
  backupLoading,
}) => {
  const authContext = useContext(AuthContext)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  useEffect(() => {
    if (gistIdValue) {
      setIsUpdating(true)
    } else {
      setIsUpdating(false)
    }
  }, [gistIdValue])

  const handleSubmit = () => {
    if (!filenameValue) {
      alert("Enter a filename!")
      return
    }
    onSubmit()
  }

  return (
    <div className="py-4">
      <div className="flex flex-row items-center">
        <p className="font-bold text-lg mr-2">Backup to Github Gist</p>
        {backupLoading && (
          <div className="h-8 w-8">
            <Loader />
          </div>
        )}
      </div>
      {authContext.isLoggedIn ? (
        <>
          {backupCreated && htmlUrlValue && (
            <div className="m-4 p-2 border rounded">
              <p className="text-lg pb-2">Backup Created</p>
              <div className="flex flex-row items-center text-blue-600 hover:underline">
                <a href={htmlUrlValue}>View on Github</a>
                <div className="h-4 w-4">
                  <ExternalLinkIcon />
                </div>
              </div>
            </div>
          )}
          <div className="form-container">
            <label className="form-label">Filename</label>
            <input
              className="form-field"
              value={filenameValue}
              onChange={(e) => onFilenameChange(e.target.value)}
            />
          </div>

          <div className="form-container">
            <label className="form-label">Description (optional)</label>
            <input
              className="form-field"
              value={descriptionValue}
              onChange={(e) => onDescriptionChange(e.target.value)}
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
              onChange={(e) => onGistIdChange(e.target.value)}
            />
          </div>

          <div className="form-container">
            <label className="form-label">Autosave</label>
            <div className="flex flex-row items-center">
              <input
                className="mr-2"
                type="checkbox"
                id="autosave"
                name="autosave"
              />
              <p>Automatically backup when changes are made</p>
            </div>
          </div>

          <Button
            label={isUpdating ? "Update Existing Gist" : "Create new Gist"}
            onClick={handleSubmit}
          />
        </>
      ) : (
        <GithubAuthButton />
      )}
    </div>
  )
}

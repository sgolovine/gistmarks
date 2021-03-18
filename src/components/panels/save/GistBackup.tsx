import React, { useContext, useEffect, useState } from "react"
import Button from "~/components/common/Button"
import { GithubAuthButton } from "~/components/common/GithubAuthButton"
import { AuthContext } from "~/context"

interface Props {
  filenameValue: string
  descriptionValue: string
  gistIdValue: string
  onGistIdChange: (newDesc: string) => void
  onDescriptionChange: (newDesc: string) => void
  onFilenameChange: (newFilename: string) => void
}

export type GistBackupState = Pick<
  Props,
  "filenameValue" | "descriptionValue" | "gistIdValue"
>

export const GistBackup: React.FC<Props> = ({
  filenameValue,
  descriptionValue,
  gistIdValue,
  onGistIdChange,
  onFilenameChange,
  onDescriptionChange,
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

  return (
    <div className="py-4">
      <p className="font-bold text-lg">Backup to Github Gist</p>
      {authContext.isLoggedIn ? (
        <>
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

          <Button
            label={isUpdating ? "Update Existing Gist" : "Create new Gist"}
          />
        </>
      ) : (
        <GithubAuthButton />
      )}
    </div>
  )
}

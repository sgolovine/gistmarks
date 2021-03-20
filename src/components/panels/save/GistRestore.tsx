import React from "react"
import Button from "~/components/common/Button"

interface Props {
  filenameValue: string
  gistIdValue: string
  onFilenameChange: (newValue: string) => void
  onGistIdChange: (newValue: string) => void
}

export type GistRestoreState = Pick<Props, "filenameValue" | "gistIdValue">

export const GistRestore: React.FC<Props> = ({
  filenameValue,
  gistIdValue,
  onFilenameChange,
  onGistIdChange,
}) => {
  return (
    <div className="py-4">
      <p className="font-bold text-lg">Restore from Github Gist</p>
      <div className="form-container">
        <label className="form-label">Filename</label>
        <input
          className="form-field"
          value={filenameValue}
          onChange={(e) => onFilenameChange(e.target.value)}
        />
      </div>
      <div className="form-container">
        <label className="form-label">Gist ID</label>
        <input
          className="form-field"
          value={gistIdValue}
          onChange={(e) => onGistIdChange(e.target.value)}
        />
      </div>
      <Button label="Restore Collection" />
    </div>
  )
}

import React from "react"

interface Props {
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const LocalRestore: React.FC<Props> = ({ onSelectFile }) => {
  return (
    <div className="py-4">
      <p className="font-bold text-lg">Restore from JSON File</p>
      <p className="max-w-sm">
        Note: if you have unsaved bookmarks, they will be overwritten when
        restoring from a JSON file
      </p>
      <input className="py-2" type="file" onChange={onSelectFile} />
    </div>
  )
}

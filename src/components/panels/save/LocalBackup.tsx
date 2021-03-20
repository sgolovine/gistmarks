import React from "react"
import Button from "~/components/common/Button"

interface Props {
  handleBackup: () => void
}

export const LocalBackup: React.FC<Props> = ({ handleBackup }) => {
  return (
    <div className="py-4">
      <p className="font-bold text-lg">Backup to JSON File</p>
      <Button
        additionalClassnames="m-2"
        label="Download JSON File"
        onClick={handleBackup}
      />
    </div>
  )
}

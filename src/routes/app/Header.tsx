import React, { useContext } from "react"
import Button from "~/components/common/Button"
import IconButton from "~/components/common/IconButton"
import { Loader } from "~/components/icons/Loader"
import MenuIcon from "~/components/icons/MenuIcon"
import { BackupContext, BookmarkContext, LayoutContext } from "~/context"

export const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)
  const backupContext = useContext(BackupContext)

  const buttonText = layoutContext.createPanelOpen
    ? "Close Window"
    : "Create Bookmark"

  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <IconButton onClick={layoutContext.toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <p className="text-lg font-bold">GistMarks</p>
        <div>
          <input
            value={bookmarkContext.searchTerm}
            onChange={(e) => bookmarkContext.setSearch(e.target.value)}
            placeholder="Search"
            className="ml-2 py-2 px-1 border rounded"
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        {backupContext.gistBackup.backupLoading && (
          <div className="h-8 w-8">
            <Loader />
          </div>
        )}
        <Button
          onClick={layoutContext.toggleSavePanel}
          label="Backup and Sync"
          additionalClassnames="w-36 mx-4"
        />
        <Button
          onClick={layoutContext.toggleCreatePanel}
          label={buttonText}
          additionalClassnames="w-36"
        />
      </div>
    </div>
  )
}

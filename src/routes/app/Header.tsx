import React, { useContext } from "react"
import Media from "react-media"

import Button from "~/components/common/Button"
import { CogIcon } from "~/components/icons/CogIcon"
import { Loader } from "~/components/icons/Loader"
import MenuIcon from "~/components/icons/MenuIcon"
import { PlusIcon } from "~/components/icons/PlusIcon"
import {
  BackupContext,
  BookmarkContext,
  GlobalStateContext,
  LayoutContext,
} from "~/context"
import { GLOBAL_MEDIA_QUERIES } from "~/defines/mediaQueries"

export const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const globalStateContext = useContext(GlobalStateContext)
  const bookmarkContext = useContext(BookmarkContext)
  const backupContext = useContext(BackupContext)

  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <button
          className="h-10 w-10 p-2 mx-2 border rounded shadow"
          onClick={layoutContext.toggleSidebar}
        >
          <MenuIcon />
        </button>
        <Media
          query={GLOBAL_MEDIA_QUERIES.lg}
          render={() => <p className="text-lg font-bold">GistMarks</p>}
        />

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
        <button
          className="h-10 w-10 p-2 mx-2 border rounded shadow"
          onClick={layoutContext.toggleSavePanel}
        >
          <CogIcon />
        </button>
        <button
          className="h-10 w-10 p-2 ml-2 border rounded shadow"
          onClick={layoutContext.toggleCreatePanel}
        >
          <PlusIcon />
        </button>
        {globalStateContext.unsavedChanges &&
          backupContext.backupResults.backupCreated && (
            <Button
              onClick={backupContext.actions.updateBackup}
              danger
              label="Save Changes"
              additionalClassnames="w-36 mx-4"
            />
          )}
      </div>
    </div>
  )
}

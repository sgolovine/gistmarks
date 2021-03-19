// For things that require information from multiple providers. Put logic that here
import React, { ReactNode, useContext, Fragment, useEffect } from "react"
import { BackupContext } from "./BackupContext"
import { BookmarkContext } from "./BookmarkContext"

export const LogicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bookmarkContext = useContext(BookmarkContext)
  const backupContext = useContext(BackupContext)

  useEffect(() => {
    console.log("Logic Provider Registered")
  }, [])

  // Autosave Bookmarks
  // This is currently broken, pending some infinite loops
  // Should be fixed.
  // useEffect(() => {
  //   if (
  //     backupContext.options.autoSave &&
  //     backupContext.backupResults.gistId &&
  //     backupContext.backupResults.backupCreated
  //   ) {
  //     console.log("Logic Provider > bookmarks changed")
  //     // backupContext.actions.updateBackup()
  //   }
  // }, [bookmarkContext.bookmarks])

  return <Fragment>{children}</Fragment>
}

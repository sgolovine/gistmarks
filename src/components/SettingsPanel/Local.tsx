import { Button, makeStyles, Typography } from "@material-ui/core"
import React, { useContext } from "react"
import { BookmarkContext } from "~/context"
import { downloadFile } from "~/helpers"

const useStyles = makeStyles((theme) => ({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    // width: "100%",
    paddingBottom: theme.spacing(4),
  },
  buttonContainer: {
    paddingTop: theme.spacing(2),
  },
}))

export const LocalBackup = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const classes = useStyles()

  const handleBackupToJSON = () => {
    const bookmarksJsonData = JSON.stringify(bookmarkContext.bookmarks, null, 2)
    downloadFile(bookmarksJsonData, "bookmarks.json")
  }

  return (
    <div className={classes.itemContent}>
      <Typography variant="h6">Restore from JSON File</Typography>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleBackupToJSON}
        >
          Save to JSON File
        </Button>
      </div>
    </div>
  )
}

export const LocalRestore = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const classes = useStyles()

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
    <div className={classes.itemContent}>
      <Typography variant="h6">Restore from JSON File</Typography>
      <p>
        Note: if you have unsaved bookmarks, they will be overwritten when
        restoring from a JSON file
      </p>
      <input type="file" onChange={handleSelectFile} />
    </div>
  )
}

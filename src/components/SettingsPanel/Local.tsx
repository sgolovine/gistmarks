import { Button, makeStyles } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
})

export const LocalBackup = () => {
  return (
    <Button color="primary" variant="contained">
      Save to JSON File
    </Button>
  )
}

export const LocalRestore = () => {
  const classes = useStyles()
  return (
    <div className={classes.itemContent}>
      <p>
        Note: if you have unsaved bookmarks, they will be overwritten when
        restoring from a JSON file
      </p>
      <input type="file" onChange={() => null} />
    </div>
  )
}

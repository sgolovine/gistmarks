import { Button, makeStyles, TextField } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme) => ({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  itemInput: {
    margin: theme.spacing(1),
  },
}))

export const GistRestore = () => {
  const classes = useStyles()

  return (
    <div className={classes.itemContent}>
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Filename"
      />
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Gist ID"
      />

      <div>
        <Button variant="contained" color="primary">
          Restore
        </Button>
      </div>
    </div>
  )
}

import React, { useContext } from "react"
import { BackupContext } from "~/context"
import { Button, makeStyles, TextField } from "@material-ui/core"

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
  const { state, actions } = useContext(BackupContext)
  return (
    <div className={classes.itemContent}>
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Gist ID"
        value={state.gistId}
        onChange={(e) => actions.setGistId(e.target.value)}
      />

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={actions.restoreBackup}
        >
          Restore
        </Button>
      </div>
    </div>
  )
}

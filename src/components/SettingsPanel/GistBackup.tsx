import React, { useContext, useState } from "react"
import {
  Button,
  Checkbox,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { BackupContext } from "~/context"

const useStyles = makeStyles((theme) => ({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: theme.spacing(1),
  },
  itemInput: {
    margin: theme.spacing(1),
  },
  logoutButtonContainer: {
    marginTop: theme.spacing(1),
  },
}))

export const GistBackup = () => {
  const classes = useStyles()
  const { state, actions } = useContext(BackupContext)

  const [editGist, setEditGist] = useState<boolean>(false)

  return (
    <div className={classes.itemContent}>
      <Typography variant="h6">Backup to Gist</Typography>
      <FormControlLabel
        control={
          <Checkbox value={editGist} onChange={() => setEditGist(!editGist)} />
        }
        label="Update Existing Collection"
      />
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Filename"
        value={state.gistFilename}
        onChange={(e) => actions.setFilename(e.target.value)}
      />
      <TextField
        className={classes.itemInput}
        variant="outlined"
        label="Collection Name (optional)"
        value={state.gistName}
        onChange={(e) => actions.setName(e.target.value)}
      />
      {editGist && (
        <TextField
          className={classes.itemInput}
          variant="outlined"
          label="Gist ID (optional)"
          value={state.gistId}
          onChange={(e) => actions.setGistId(e.target.value)}
        />
      )}
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={editGist ? actions.updateBackup : actions.createBackup}
        >
          {editGist ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  )
}

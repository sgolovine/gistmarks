import React, { useContext } from "react"
import { AuthContext, BackupContext } from "~/context"
import { Button, makeStyles, TextField, Typography } from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles((theme) => ({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  itemInput: {
    margin: theme.spacing(1),
  },
  logoutButtonContainer: {
    marginTop: theme.spacing(2),
  },
}))

export const GistRestore = () => {
  const classes = useStyles()
  const { state, actions } = useContext(BackupContext)
  const { logout } = useContext(AuthContext)

  return (
    <div className={classes.itemContent}>
      <Typography variant="h6">Restore from Gist</Typography>
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

      <div className={classes.logoutButtonContainer}>
        <Button startIcon={<GitHubIcon />} onClick={logout}>
          LOGOUT
        </Button>
      </div>
    </div>
  )
}
